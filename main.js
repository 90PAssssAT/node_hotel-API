// const prompt = require("prompt-sync")();

// const age = prompt("Please enter your age: ");
// if (age < 18) {
//   console.log("You are a minor.");
// } else {
//   console.log("You are an adult.");
// }

// function add(a, b) {  simple way to write function
//   return a + b;
// }

// var add = function (a, b) { advanced way to write function
//   return a + b;
// };

// arrow function way to write function ecma script 6
// var add = (a, b) => {
//   return a + b;
// };
// const result = add(5, 8);
// console.log(`The result is: ${result}`);
/********************call back function Start ********************************/
// var callback = () => {
//   console.log("callback function running."); // simple way to write function
// };
// var add = (x, y, callback) => {
//   var sum = x + y;
//   console.log(`The sum is: ${sum}`);
//   callback();
// };
// add(5, 8, callback);

// var add = (x, y, prasad) => {  // advanced way to write function
//   var sum = x + y;
//   console.log(`The sum is: ${sum}`);
//   prasad();
// };
// add(5, 8, () => {
//   console.log("callback function running.");
// });
/********************call back function End ********************************/

var fs = require("fs");
var os = require("os");

var user = os.userInfo();
// console.log(user);
// console.log(user.username);
fs.appendFile("greetings.txt", `Hello ${user.username}!\n`, () => {
  console.log("File created successfully.");
});
