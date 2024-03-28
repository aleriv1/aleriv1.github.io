// console.log(`test`);

function add(par1, par2) {}
// это декларация функции

const fn = function (par1, par2) {};
// Это funtion expression

// ()=>{}

let pi = (e) => {
  e;
};
// arrow function, стрелочная функция

add(`a`, `b`, `c`);
// Спрейд оператор ...

// function add1(par1, ...par2) {
// function add1(par1, par2) {
function add1(par1, par2 = 100) {
  console.log(par2);
}

add1("a");

// #region callback

// функция обратного вызова

console.log(`--- callback`);

const terminator = () => {
  console.log(`I will back;`);
};

function live(fn) {
  // delay(2000); // оператор задержки
  // асинхронное программирование
  let s = 2 + 3;
  fn();
}

live(terminator);

// можно сделать сразу так
// todo:
live((data) => {
  console.log(data);
});

// то есть события в определённое время

let root = document.querySelector(`#field`);

function callback(event) {
  // function callback(e) {
  console.log(event);
  // console.log(e);
  // console.log(`lilya`);
}
function callback_(event) {
  console.log(event);
}

// Можно навешивать таким образом несколько лисенеров, нежели при просто onclick

root.addEventListener("click", callback);

// #endregion callback
