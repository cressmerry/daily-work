function add() {
  let sum = 0;
  for (i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

const addWithArrow = (...numbers) => {
  let sum = 0;
  for (i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
};
const result = addWithArrow(5, 4, 4, 4, 4);
console.log(result);
