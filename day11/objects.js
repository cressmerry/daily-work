// class User{
//     name = "john";
//     greeting = "hello";
// }

// const user = new User();
// console.log(user.name + " say " + user.greeting);

// let user1 = { name: "John", address: { street: "Kaayar", houseNumber: 20 } };
// console.log(user1.address.houseNumber);

const users = [
  { id: 1, name: "A", active: true },
  { id: 2, name: "B", active: false },
  { id: 3, name: "C", active: true },
];

// function countActive(users) {
//   return users.reduce(((sum, value) => {
//     return sum + (value.active ? 1 : 0);
//   }), 0);
// }

// console.log(countActive(users));

function toggle(users) {
  users.forEach((user) => {
    user.active = !user.active;
  });
}
toggle(users);
console.log(users);
