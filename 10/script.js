const transformStudentObject = ({ firstName, secondName, thirdName, tuitionStarted, tuitionEnds, ...rest }) => {
  return {
    name: `${secondName} ${firstName} ${thirdName}`,
    ...rest,
    tuition: `${tuitionStarted} - ${tuitionEnds}`,
  };
}

const validateFields = (inputs) => {
  let isCorrect = true;

  for (let key in inputs) {
    const input = inputs[key];

    if (
      !input.value.trim()
      || key === "birthInput" && new Date(input.value) > new Date()
      || key === "tuitionStartedInput" && new Date(input.value) < new Date("2000-01-01")
    ) {
      input.classList.add("border-danger");
      isCorrect = false;
    } else {
      input.classList.remove("border-danger");
    }
  }

  return isCorrect;
}

const createInput = (placeholder, onfocus = () => { }, onblur = () => { }) => {
  const input = document.createElement("input");
  input.classList.add("input", "w-100", "mb-2", "rounded", "border", "p-2");

  input.onfocus = onfocus;
  input.onblur = onblur;

  input.placeholder = placeholder;

  return input;
}

const createTitle = (textContent) => {
  const title = document.createElement("h5");
  title.classList.add("text-center", "fs-4");
  title.textContent = textContent;

  return title;
}

const rerenderTableBody = (students) => {
  const table = document.querySelector("table");
  table.querySelector("tbody")?.remove();

  const tableBody = createTableBody(students);

  table.append(tableBody);
}

const createTableBody = (students) => {
  const tableBody = document.createElement("tbody");

  students.forEach(item => {
    const student = transformStudentObject(item);

    const row = document.createElement("tr");

    for (let key in student) {
      const cell = createTableCell("td", "", student[key]);
      row.append(cell);
    }

    tableBody.append(row);
  });

  return tableBody;
}

const createAddStudentForm = (students) => {
  const form = document.createElement("form");

  const title = createTitle("Добавить студента");

  const firstNameInput = createInput("Имя");
  const secondNameInput = createInput("Фамилия");
  const thirdNameInput = createInput("Отчество");
  const birthInput = createInput("Дата рождения", function () { this.type = "date" }, function () { this.type = "text" });
  const tuitionStartedInput = createInput("Дата начала обучения", function () { this.type = "date" }, function () { this.type = "text" });
  const facultyInput = createInput("Факультет");

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.classList.add("btn", "btn-primary", "w-100");
  submitBtn.textContent = "Добавить";
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (validateFields({
      firstNameInput,
      secondNameInput,
      thirdNameInput,
      birthInput,
      tuitionStartedInput,
      facultyInput,
    })) {
      students.push({
        firstName: firstNameInput.value.trim(),
        secondName: secondNameInput.value.trim(),
        thirdName: thirdNameInput.value.trim(),
        faculty: facultyInput.value.trim(),
        birth: new Date(birthInput.value.trim()).toLocaleDateString(),
        tuitionStarted: new Date(tuitionStartedInput.value.trim()).toLocaleDateString(),
        tuitionEnds: (new Date(Number(tuitionStartedInput.value.trim().slice(0, 4)) + 4 + tuitionStartedInput.value.trim().slice(4))).toLocaleDateString(),
      });

      firstNameInput.value = "";
      secondNameInput.value = "";
      thirdNameInput.value = "";
      birthInput.value = "";
      tuitionStartedInput.value = "";
      facultyInput.value = "";

      rerenderTableBody(students);
    }
  });

  form.append(title);
  form.append(firstNameInput);
  form.append(secondNameInput);
  form.append(thirdNameInput);
  form.append(birthInput);
  form.append(tuitionStartedInput);
  form.append(facultyInput);
  form.append(submitBtn);

  return form;
}

const createFilters = (students) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("mt-5");

  const title = createTitle("Фильтры");

  const fullNameInput = createInput("Имя");
  const facultyInput = createInput("Факультет");
  const tuitionStartedInput = createInput("Год начала обучения");
  const tuitionEndsInput = createInput("Год окончания обучения");

  let timeout;
  wrapper.addEventListener("input", () => {
    clearTimeout(timeout);


    timeout = setTimeout(() => {
      const filteredStudents = students.filter(student => {
        return `${student.secondName} ${student.firstName} ${student.thirdName}`.toLowerCase().includes(fullNameInput.value.toLowerCase())
          && student.faculty.toLowerCase().includes(facultyInput.value.toLowerCase())
          && (!tuitionStartedInput.value || student.tuitionStarted.slice(6) === tuitionStartedInput.value)
          && (!tuitionEndsInput.value || student.tuitionEnds.slice(6) === tuitionEndsInput.value)
      });

      rerenderTableBody(filteredStudents);
    }, 300);
  })

  wrapper.append(title);
  wrapper.append(fullNameInput);
  wrapper.append(facultyInput);
  wrapper.append(tuitionStartedInput);
  wrapper.append(tuitionEndsInput);

  return wrapper;
}

const createTableCell = (tag = "td", role = "", textContent) => {
  const cell = document.createElement(tag);
  cell.role = role;
  cell.textContent = textContent;

  return cell;
}

const createStudentsTable = (students) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("w-100", "h-100");

  const table = document.createElement("table");
  table.classList.add("table");

  const tableHeader = document.createElement("thead");
  const tableHeaderRow = document.createElement("tr");

  const tableHeaderFullNameCell = createTableCell("th", "button", "Имя");
  const tableHeaderFacultyCell = createTableCell("th", "button", "Факультет");
  const tableHeaderBirthCell = createTableCell("th", "button", "Дата рождения");
  const tableHeaderTuitionStartedCell = createTableCell("th", "button", "Годы обучения");

  const tableBody = createTableBody(students);

  tableHeaderRow.append(tableHeaderFullNameCell);
  tableHeaderRow.append(tableHeaderFacultyCell);
  tableHeaderRow.append(tableHeaderBirthCell);
  tableHeaderRow.append(tableHeaderTuitionStartedCell);

  tableHeader.append(tableHeaderRow);

  tableHeader.addEventListener("click", (e) => {
    if (e.target.textContent === "Имя") {
      const sortedStudents = students.sort((a, b) => (
        a.firstName + a.secondName + a.thirdName > b.firstName + b.secondName + b.thirdName ? 1 : -1
      ));
      rerenderTableBody(sortedStudents);

    } else if (e.target.textContent === "Факультет") {
      const sortedStudents = students.sort((a, b) => a.faculty > b.faculty ? 1 : -1);
      rerenderTableBody(sortedStudents);

    } else if (e.target.textContent === "Дата рождения") {
      const sortedStudents = students.sort((a, b) => new Date(`${a.birth.slice(6)}-${a.birth.slice(3, 5)}-${a.birth.slice(0, 2)}`) > new Date(`${b.birth.slice(6)}-${b.birth.slice(3, 5)}-${b.birth.slice(0, 2)}`) ? 1 : -1);
      rerenderTableBody(sortedStudents);

    } else if (e.target.textContent === "Годы обучения") {
      const sortedStudents = students.sort((a, b) => Number(a.tuitionStarted.slice(6)) > Number(b.tuitionStarted.slice(6)) ? 1 : -1);
      rerenderTableBody(sortedStudents);
    }
  });

  table.append(tableHeader);
  table.append(tableBody);

  wrapper.append(table);

  return wrapper;
}

const start = () => {
  const students = [];

  const container = document.querySelector(".container");

  const leftSideWrapper = document.createElement("wrapper");
  leftSideWrapper.classList.add("wrapper", "w-25", "mr-5");

  const addStudentForm = createAddStudentForm(students);
  const filters = createFilters(students);
  const studentsTable = createStudentsTable(students);

  leftSideWrapper.append(addStudentForm);
  leftSideWrapper.append(filters);

  container.append(leftSideWrapper);
  container.append(studentsTable);
}

start();