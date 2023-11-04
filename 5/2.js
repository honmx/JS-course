const filter = (array, excludeItemsArray) => {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    if (!excludeItemsArray.includes(array[i])) {
      result.push(array[i]);
    }
  }

  return result;
}

const whiteList = ['my-email@gmail.ru', 'jsfunc@mail.ru', 'annavkmail@vk.ru', 'fullname@skill.ru', 'goodday@day.ru']
const blackList = ['jsfunc@mail.ru','goodday@day.ru']

console.log(filter(whiteList, blackList));