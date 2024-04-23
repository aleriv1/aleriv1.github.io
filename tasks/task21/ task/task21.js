//todo:
// 1. Реализовать очистку чата. В интерфейсе отрисовать кнопку удалить. При ее нажатии удаляется вся переписка.
// 2. На контейнер сообщения повесить элемент удаления. При наведении на сообщение всплывает "X", при его нажатии удалятся сообщение.

// для полноценной проверки -- надо запустить сервер в папке code -- там без node модулей

// здесь -- части решения
// #region код из app.js

console.log("app.js");
import Handlebars from "handlebars";
import { v4 as uuidv4 } from "uuid";

import { Chat } from "./portial/chat.hbs";
import { tmplLayout } from "./layout";
import "./portial/button.hbs";

Chat.init();
let template = Handlebars.compile(tmplLayout);
let htmlApp = template();
let root = document.getElementById("app");
root.innerHTML = htmlApp;

const button = document.querySelector('button[data-id="sendButton"]');
let delMsg;
button.addEventListener("click", function () {
  const inputDOM = document.querySelector('input[data-id="message"]');
  if (inputDOM.value) {
    let myuuid = uuidv4();
    let item = {
      id: myuuid,
      id_user: 100,
      name: "VG",
      message: inputDOM.value,
    };
    Chat.addMessage(item);
    // console.log(item);
  }

  delMsg = document.getElementsByClassName(`close`);
  Array.from(delMsg).forEach((element) => {
    element.addEventListener("click", function () {
      event.target.parentNode.parentNode.remove();
    });
  });
  console.log(`delMsg`, delMsg);
});

const delConvButton = document.querySelector(`button[data-id="delConvButton"]`);
delConvButton.addEventListener("click", function () {
  window.localStorage.clear();
  let root = document.querySelector('div[data-id="chat"]');
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
});

// #endregion
