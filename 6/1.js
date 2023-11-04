const getOlderUser = (user1, user2) => {
  return user1.age > user2.age
    ? user1.name
    : user2.name;
}

const user1 = {
  name: "Maxim",
  age: 19
};

const user2 = {
  name: "Alex",
  age: 22
};

console.log(getOlderUser(user1, user2));