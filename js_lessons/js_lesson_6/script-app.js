// like google callenaar
// сетка 7+5 --
// console.log(`test`);

// #region
const root = document.querySelector(`#field`); // 20240328-190838

// let grid = [
//   // 20240328-192644
//   {
//     id: `28.02.2024`,
//     event: [
//       { id: 1, time: `10.00`, name: `Завтрак` },
//       { id: 2, time: `10:00`, name: `Уборка` },
//       { id: 3, time: `14:00`, name: `Ужин` },
//     ],
//   },

//   {
//     id: `29.02.2024`,
//     event: [
//       { id: 1, time: `10.00`, name: `Завтрак` },
//       { id: 2, time: `10:00`, name: `Уборка` },
//       { id: 3, time: `14:00`, name: `Ужин` },
//     ],
//   },
//   {
//     id: `01.03.2024`,
//     event: [
//       { id: 1, time: `10.00`, name: `Завтрак` },
//       { id: 2, time: `10:00`, name: `Уборка` },
//       { id: 3, time: `14:00`, name: `Ужин` },
//     ],
//   },
//   {
//     id: `02.03.2024`,
//     event: [
//       { id: 1, time: `10.00`, name: `Завтрак` },
//       { id: 2, time: `10:00`, name: `Уборка` },
//       { id: 3, time: `14:00`, name: `Ужин` },
//     ],
//   },
// ];

// function createNode(action) {
function createChildNode(paren, childAction) {
  // Делаем то же, что с нашими нодами -- мы их конструируем

  if (childAction.length == 0) return;

  childAction.forEach((el) => {
    let elm = document.createElement(`div`); // error ?
    elm.setAttribute(`data-id`, el.id); //
    let textNode = document.createTextNode(el.time + ": " + el.name); // error ?

    elm.appendChild(textNode);
    paren.appendChild(elm);
  });

  // else {

  // }
}

function render(data) {
  data.forEach((element) => {
    // каждый элемент массива
    let node = createField(element.id); // first version
    addCssField(node);
    root.appendChild(node);
    createChildNode(node, element.event); // 20240328-193001
  });
}

// render(grid);

// #region

let el = document.querySelector(`#info`);

// fetch("/sever/data.json", {
fetch("/sever/modal.html", {
  // 20240328-205614
  method: "POST", // Здесь так же могут быть GET, PUT, DELETE
  // body: JSON.stringify(newPost), // Тело запроса в JSON-формате
  headers: {
    // Добавляем необходимые заголовки
    // "Content-type": "application/json; charset=UTF-8",
    "Content-type": "text/html; charset=UTF-8",
  },
})
  .then((response) => response.json())
  // .then((response) => response.text()) // 20240328-205509
  .then((data) => {
    console.log(data);
    el.innerHTML = data.name;
    // el.innerHTML = data; // 20240328-205813
    // {title: "foo", body: "bar", userId: 1, id: 101}
  });

// #endregion

// #endregion

function addCssField(elm) {
  elm.classList.add(`div-bg`);
}

// function createField(currDate = "26.03.2024") {
function createField(currDate) {
  // // #region pre class
  // Создаём элемет
  let elm = document.createElement(`div`);
  // это будет пустая констуркция, к которой надо что-то прикрепить

  // какой-то текстовый узел
  // let textNode = document.createTextNode(`26.03.2024`);

  elm.setAttribute(`data-id`, "28.03.2024"); // 20240328-192242

  let textNode = document.createTextNode(currDate);
  elm.appendChild(textNode);
  elm.classList.add(`div-bg`);

  return elm;
}

async function getData() {
  let response = await fetch("/sever/data.json");
  // let  data = await response.json();
  let grid = await response.json();

  render(grid);
  // el.innerHTML = data.name;
  // el.innerHTML = data;
}

getData();

// #region pre class

let childNode = createField();
let childNode_ = createField(`27.03.2024`);
let childNode__ = createField(`28.03.2024`);
let childNode___ = createField(`29.03.2024`);
// много повторяющихся действий -- напрашивается цикл

// #endregion pre class

// let root = document.querySelector(`#field`);
// const root = document.querySelector(`#field`); // 20240328-190838

// #region pre class

// root.appendChild(childNode);
// root.appendChild(childNode_);
// root.appendChild(childNode__);
// root.appendChild(childNode___);

// #endregion pre class

// Всплытие события от дочернего -- к родительскому

// addCssField(childNode);
// addCssField(childNode_);
// addCssField(childNode__);
// addCssField(childNode___);

function callback(event) {
  // console.log(event);

  event.stopPropagation();
  let time = prompt("Введите события");
  // let ch = createField(`10:00 Завтрак`);
  let ch = createField(time);
  //
  ch.addEventListener("click", (el) => {
    el.target.remove();
  });
  //
  // console.log(event);
  event.target.appendChild(ch);
  console.log(`test`);
}

root.addEventListener("click", callback);

// Завести массив для каждого дня -- в него всё (для дня).

// Надо работать с моделью

// time + `${new Date()}`
