const getAge = (birthYear) => {
  return new Date().getFullYear() - birthYear;
}

console.log(getAge(2004));
console.log(getAge(2000));