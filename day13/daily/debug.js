// const user = {name : "John", age : 20};
// let jsonString = JSON.stringify(user);
// let temp = JSON.parse(jsonString);
// temp.isAdult = temp.age > 18;
// let finalObject = temp;
// console.log(finalObject);

// const users = [
//   { name: "A", role: "admin" },
//   { name: "B", role: "user" },
//   { name: "C", role: "admin" },
// ];

// const freq = users.reduce((acc, user) => {
//   acc[user.role] = (acc[user.role] || 0) + 1;
//   return acc;
// }, {});

// console.log(freq)

// const users = [
//   { name: "B", age: 20 },
//   { name: "A", age: 20 },
//   { name: "C", age: 18 },
// ];

// users.sort((a, b) => {
//   if (a.age !== b.age) return a.age - b.age;
//   return a.name.localeCompare(b.name);
// });

// console.log(users);

// const users = [
//   { name: "A", role: "admin", salary: 4000 },
//   { name: "A", role: "admin", salary: 5000 },
//   { name: "A", role: "user", salary: 4000 },
// ];
// function groupBySalary() {
//   const grouped = users.reduce(((acc, user) => {
//     if (!acc[user.salary]) acc[user.salary] = [];
//     acc[user.salary].push(user);
//     return acc;
//   }), {});
//   return grouped;
// }

// console.log(groupBySalary());

// function diff(a, b){
//     const result = {};
//     for(let key in b){
//         if(a[key]!==b[key]){
//             result[key] = {old: a[key], new: b[key]};
//         }
//     }
//     return result;
// }

// const a = {name :"A", age: 20};
// const b = {name :"A", age: 21};

// console.log(diff(a, b));

// function validate(obj, requiredKeys) {
//   return requiredKeys.every((key) => key in obj);
// }

// const data = { name: "John", age: 25 };
// console.log(validate(data, ["name", "age", "email"]));

// arr = [1,2,3];
// console.log(arr[3]);

// for(let i = 0; i<3;i++){
//   setTimeout(()=>console.log(i), 100);
// }

// console.log(["1", "2", "3"].map(Number));

// console.log((0.2 + 0.1) === 0.3);

// let a = {x : 2};
// b = a;
// b.x = 3;
// console.log(b.x);

// console.log(1);
// setTimeout(()=>console.log(2), 0);
// console.log(3);

// const arr = [1,3];
// arr = [4,5]

// console.log(
//   [1, 2, 3].filter((n) => {
//     return n > 1;
//   }),
// );
