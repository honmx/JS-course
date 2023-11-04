const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const compareRandomNumbers = (a, b) => {  
  const max = Math.max(a, b);
  const min = Math.min(a, b);

  console.log(`min = ${min}, max = ${max}`);

  if (min === max) {
    console.log(`${min} === ${max}`);
    console.log(`${min} >= ${max}`);
  } else {
    console.log(`${min} < ${max}`);
    console.log(`${min} !== ${max}`);
  }
}

compareRandomNumbers(getRandomNumber(0, 100), getRandomNumber(0, 100));