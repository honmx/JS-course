const getNumbersArray = (length) => {
  const half = new Array(length / 2).fill(0).map((_, i) => i + 1);

  return half.concat(half);
}

const mixArray = (array) => {
  const result = array.slice(0);

  result.sort(() => Math.random() < 0.5 ? 1 : -1);

  return result;
}

const createRow = () => {
  const row = document.createElement("div");
  row.classList.add("row");

  return row;
}

const createCell = () => {
  const cell = document.createElement("div");
  cell.classList.add("col", "p-3", "border", "text-white");
  cell.role = "button";

  return cell;
}

const createButton = () => {
  const button = document.createElement("button");
  button.classList.add("button");

  return button;
}

const initField = (numbers) => {
  const field = document.createElement("div");
  field.classList.add("grid");

  let row = createRow();

  for (let i = 0; i < numbers.length; i++) {
    if (i % Math.sqrt(numbers.length) === 0) {
      field.append(row);
      row = createRow();
    }

    const cell = createCell();
    cell.textContent = numbers[i];
    row.append(cell);

    if (i === numbers.length - 1) {
      field.append(row);
    }
  }

  return field;
}

const start = () => {
  const container = document.querySelector(".container-md");

  const numbers = mixArray(getNumbersArray(16));
  const guessedCards = [];

  let activeCard = null;

  const field = initField(numbers);

  field.addEventListener("click", (e) => {
    if (!e.target.classList.contains("col")) return;

    if (!activeCard) {
      activeCard = e.target;
      activeCard.classList.toggle("text-white");
    } else if (
      activeCard
      && e.target.textContent === activeCard.textContent
      && !guessedCards.includes(e.target.textContent)
      && activeCard !== e.target
    ) {
      e.target.classList.toggle("text-white");
      guessedCards.push(e.target.textContent);
      activeCard = null;
    } else if (activeCard && e.target !== activeCard) {
      activeCard.classList.toggle("text-white");
      activeCard = null;
    }

    if (guessedCards.length === numbers.length / 2) {
      const button = createButton();
      button.textContent = "Начать заново";

      button.addEventListener("click", () => {
        field.remove();
        start();
      });

      field.append(button);
    }
  });

  container.append(field);
}

start();