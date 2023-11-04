const getOlderUser = (usersArray) => {
  return usersArray.reduce((acc, cur) => cur.age > acc.age ? cur : acc).name;
}

const users = [
  { name: "Maxim", age: 19 },
  { name: "Alex", age: 22 },
  { name: "John", age: 17 },
  { name: "Rick", age: 40 },
  { name: "Bob", age: 19 }
]

console.log(getOlderUser(users));