const getSquare = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) * Math.abs(y1 - y2);
}

console.log(getSquare(2, 3, 10, 5));
console.log(getSquare(10, 5, 2, 3));
console.log(getSquare(-5, 8, 10, 5));
console.log(getSquare(5, 8, 5, 5));
console.log(getSquare(8, 1, 5, 1));

// для x1 = 2, y1 = 3, x2 = 10, y2 = 5 площадь равна 16;
// для x1 = 10, y1 = 5, x2 = 2, y2 = 3 площадь равна 16;
// для x1 = -5, y1 = 8, x2 = 10, y2 = 5 площадь равна 45;
// для x1 = 5, y1 = 8, x2 = 5, y2 = 5 площадь равна 0;
// для x1 = 8, y1 = 1, x2 = 5, y2 = 1 площадь равна 0.