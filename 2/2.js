const getFraction = (a, b, n) => {
  return `a = ${Math.floor((a % Math.floor(a)) * 10 ** n)} \nb = ${Math.floor((b % Math.floor(b)) * 10 ** n)}`
}

console.log(getFraction(13.123456789, 2.123, 5));
console.log(getFraction(13.890123, 2.891564, 2));
console.log(getFraction(13.890123, 2.891564, 3));

// Для a = 13,123456789, b = 2,123, n = 5 дробные части: 12345, 12300.
// Для a = 13,890123, b = 2,891564, n = 2 дробные части: 89, 89.
// Для a = 13,890123, b = 2,891564, n = 3 дробные части: 890, 891.