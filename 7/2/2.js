const createStudentCard = (student) => {
  const card = document.createElement("div");

  const nameNode = document.createElement("h2");
  nameNode.textContent = student.name;

  const ageNode = document.createElement("span");
  ageNode.textContent = `Возраст: ${student.age} лет`;

  card.append(nameNode, ageNode);
  document.body.append(card);
}

createStudentCard({ name: "Игорь", age: 17 });