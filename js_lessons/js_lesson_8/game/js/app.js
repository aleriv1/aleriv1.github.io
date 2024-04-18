// console.log(`lilya`);

// #region test

// var кнопка = 100;
// console.log(кнопка);

// var -- прикручивается к window; то есть глобальная переменная

// window  == this
// window это this

// мы пишем в глобальном контексте

// #endregion test

const игровоеПоле = document.querySelector(`div[name='поле']`);
// console.log(игровоеПоле);

const СЛОВА = [
  {
    // слово: "this",
    слово: "аФома",
    // слово: "t",
    описание: "Контекст выполнения",
  },
];

console.log(`APP`);
// var кнопка = document.querySelector(`button[name=""]`)
let кнопка = document.querySelector(`button[name="go"]`);
// console.log(кнопка);

// #region arrow function example

/* // const b = ()=>
// b()
// (()=>{})(this) // контекст текущего окна

// ((w) => {
//   console.log(this);
// })(); */

// #endregion arrow function example

let кнопкаПроверка = document.querySelector(`button[name='проверить']`);
let буква = document.querySelector("input[name='буква']");

кнопкаПроверка.addEventListener(`click`, (событие) => {
  let сосед = событие.target.previousElementSibling;
  // console.log(сосед);
  // проверкаБуквы(событие.target.value);
  проверкаБуквы(сосед.value);
});

// #region проверка,erds

function проверкаБуквы(буква) {
  // console.log(буква.value);

  let мИндексов = [];
  let мбукв = СЛОВА[0].слово.split("");
  мбукв.forEach((element, index) => {
    console.log(element);
    if (буква === element) {
      мИндексов.push(index);
    }
  });
  // console.log(буква);
  console.log(мИндексов);
  if (мИндексов.length != 0) {
    мИндексов.forEach((index) => {
      // let узел = document.querySelector(`div[data-id=${index}]`);
      let узел = document.querySelector("div[data-id='" + index + "']");
      узел.innerHTML = буква;
    });
  }
}

// #endregion проверка,erds

кнопка.addEventListener(`click`, (событие) => {
  // console.log(событие);
  // console.log(this);

  // событие.target.style.visibility = "hidden";
  // событие.target.classList.add(`hidden`);
  событие.target.setAttribute(`hidden`, ``);
  начатьИгру();
});

// Способ организации кода; пример -- отрогональная функция
// Инженерный подход -- всё должно быть компонетно
// Сперва лучше всё атомизировать -- далее можно думать, как всё оъединить

// #region фабрика

// function создатьПоле() {
function создатьПоле(индекс) {
  let поле = document.createElement(`div`);
  поле.classList.add(`field`);

  поле.setAttribute(`data-id`, индекс);

  игровоеПоле.appendChild(поле);
  // console.log(`sozdatPole`);
}

// #endregion фабрика

function начатьИгру() {
  // console.log(`lilya`);
  // console.log(`начать игру`);

  let элем = СЛОВА[0]; //
  console.log(СЛОВА[0]);
  мбукв = элем.слово.split("");
  // мбукв = элем.слово.split();
  console.log(мбукв);
  // мбукв.forEach((element) => {
  мбукв.forEach((element, index) => {
    создатьПоле(index);
  });

  // создатьПоле();
  // создатьПоле();
  // создатьПоле();
  // создатьПоле();
  // создатьПоле();
}

// callback, который вызывается в момент клика
