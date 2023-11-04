const isNumberEven = (number) => {
  return number % 2
    ? "Число нечетное"
    : "Число четное";
}

console.log(isNumberEven(5));
console.log(isNumberEven(2));
console.log(isNumberEven(111));
console.log(isNumberEven(18));