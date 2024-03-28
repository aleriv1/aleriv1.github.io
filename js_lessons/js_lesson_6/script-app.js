// like google callenaar
// сетка 7+5 --
// console.log(`test`);

function addCssField(elm) {
  elm.classList.add(`div-bg`);
}

function createField(currDate = "26.03.2024") {
  // Создаём элемет
  let elm = document.createElement(`div`);
  // это будет пустая констуркция, к которой надо что-то прикрепить

  // какой-то текстовый узел
  // let textNode = document.createTextNode(`26.03.2024`);
  let textNode = document.createTextNode(currDate);
  elm.appendChild(textNode);
  elm.classList.add(`div-bg`);

  return elm;
}

let childNode = createField();
let childNode_ = createField(`27.03.2024`);
let childNode__ = createField(`28.03.2024`);
let childNode___ = createField(`29.03.2024`);
// много повторяющихся действий -- напрашивается цикл

let root = document.querySelector(`#field`);
root.appendChild(childNode);
root.appendChild(childNode_);
root.appendChild(childNode__);
root.appendChild(childNode___);

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
