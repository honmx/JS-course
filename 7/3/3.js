const createStudentsList = (students) => {
  const list = document.createElement("ul");

  students.forEach(student => {
    const card = document.createElement("li");
    
    const nameNode = document.createElement("h2");
    nameNode.textContent = student.name;
    
    const ageNode = document.createElement("span");
    ageNode.textContent = `Возраст: ${student.age} лет`;
  
    card.append(nameNode, ageNode);
    list.append(card);
  });

  document.body.append(list);
}

const students = [
  { name: "Игорь", age: 17 },
  { name: "Максим", age: 20 },
  { name: "Данил", age: 19 },
  { name: "Игорь", age: 30 },
  { name: "Игорь", age: 22 },
]

createStudentsList(students);