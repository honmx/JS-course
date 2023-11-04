const getRandomIndex = (length) => {
  return Math.floor(Math.random() * (length));
}

const getNumbersSequenceArray = (length) => {
  return Array(length).fill(0).map((_, i) => i + 1);
}

const mixArray = (array) => {
  const result = array.slice(0);

  for (let i = 0; i < result.length; i++) {
    const j = getRandomIndex(result.length);
    
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }

  return result;
}

console.log(mixArray([1, 2, 3, 4, 5]));