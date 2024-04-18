// #region before #2

// console.log("hello, world!");
console.log("Hello, Lilya!");

// window.prompt("Lilya is great!");
// window.prompt("enter the ");

// let x = prompt("enter the number");

// let x = "Lilya"; // variable
// let x = 12;

// let y = +x + 1;
// let y =
// let y;

// #region Lilya

let Lilya = "the best name";

// #endregion Lilya

let x = 12;
console.log("stage 1");

let str = "Lilya";
let foo = "Aleksnadr";
console.log("stage 2");

let flag = true;
// let flag = tre;
let flag_ = false;

const PI = 3.14; // const всегда в верхнем регистре

let as = "new";

// Какого типа
// let y = x + " + Aleksandr = is happiness";

// console.log(y);
console.log(`stage 3`);

console.log(typeof y);

// let age = 10;
// let age = prompt(`Какой ваш возраст?`);

// if (age >= 18) {
//   // alert("Выдаа паспорта");
//   console.log("Выдача паспорта");
// // } else if (18 > age < 50) {
// } else {
//   // alert("Расти!");
//   console.log("Расти!");
// }

// if (expression) { }

// ternary operator
let age = 50;
// let age = prompt(`Какой ваш возраст?`);

let result = age >= 50 ? "Долгожитель" : "Надо уточнить";

console.log("app.js result", result);

let el = document.getElementById("main");

console.log(el);

// el.innerHTML = "Lilya!";

let data = `<h2 class='header-main header-main_l'>Lilya Header</h2>`;

// el.innerHTML = data;

console.log(`typeof ("sss" + true):`, typeof ("sss" + true));

console.log(
  `typeof ('ss' + Number(true)):`,
  typeof ("ss" + Number(true))
); /* todo: why */
console.log(`'ss' + Number(true):`, "ss" + Number(true)); /* todo: why */

console.log(Number("10s") + Number(true));

// console.log("sss" + true);

// let flag = "test"; /* не пустая */

// if (flag) {
/* попадаем в цикл  */
// }

// if (!flag) {
//   /* не попадаем в if */
// }

// ---
let flag1 = "0"; // это true

// ---

let loginForm = "";

let login = loginForm || "admin"; // это конструкция принимает дефолтное значение "admin"
// здесь лучше использовать const
// это для примера -- проверка пароля -- должна быть на сервере

loginForm = "oper";
login = loginForm || "admin"; // это конструкция  значение "oper"

// && -- возвращает последнее true; если сталкивается с false -- сразу false

// ---

function checkLogin() {
  // alert("submit!");
  document.getElementById("login");

  let login = document.getElementById("login");
  let password = document.getElementById("password");

  console.log("value", login.value);

  if (login.value && password.value) {
    // if (login.value) {
    alert("form is valid");
  } else {
    alert("`something gets wrong`");
  }

  return false;
}
