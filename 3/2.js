const transformFullName = (name, surname) => {
  const transformedName = name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
  const transformedSurname = surname.slice(0, 1).toUpperCase() + surname.slice(1).toLowerCase();

  console.log(transformedName, transformedSurname);

  console.log(
    name === transformedName && surname === transformedSurname
      ? "Имя осталось без изменений"
      : "Имя было преобразовано"
  );
}

transformFullName("maXim", "kliMenkO");
transformFullName("Maxim", "Klimenko");