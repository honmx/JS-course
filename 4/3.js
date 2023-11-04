const getItemIndex = (array, item) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) return i;
  }

  return -1;
}

console.log(getItemIndex([1, 2, 3, 4, 5], 3));
console.log(getItemIndex([1, 2, 3, 4, 5], 6));