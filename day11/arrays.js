// const callback = (value)=>{
//     return value++;
// }

// function demo1() {
//   let numbers = [1, 2, 3, 4, 5];
//   incrementdNumbers = numbers.map(callback);
//   console.log(incrementdNumbers)
// }

// demo1();

// function filterDemo() {
//   let numbers = [1, 2, 3, 4, 5];
//   const evenArray = numbers.filter((value) => {
//     return value % 2 == 0;
//   });
//   console.log(evenArray);

// }

// filterDemo

function printPyramid(size) {
  for (i = 0; i < size; i++) {
    let temp = "";
    for (j = 0; j < i; j++) {
      temp += "*";
    }
    console.log(temp)
  }
}

printPyramid(5);
