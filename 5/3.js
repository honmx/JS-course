const arrSort = (array) => {
  const result = array.slice(0);

  for (let i = result.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (result[j] > result[j + 1]) {
        const temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }

  return result;
}

console.log(arrSort([2, 5, 1, 3, 4]));