const concatArrays = (arr1, arr2) => {
  const result = arr1.slice(0);

  for (let i = 0; i < arr2.length; i++) {
    result.push(arr2[i]);
  }

  return result;
}

console.log(concatArrays([1, 2, 3, 4, 5], [1, 2, 3]));
console.log(concatArrays([5, 4, 3, 2], [1, 2, 3, 4, 5]));
console.log(concatArrays([5, 4, 3, 2], [1, 2, 3, 4]));