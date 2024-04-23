//todo:
// 1. Реализовать очистку чата. В интерфейсе отрисовать кнопку удалить. При ее нажатии удаляется вся переписка.
// 2. На контейнер сообщения повесить элемент удаления. При наведении на сообщение всплывает "X", при его нажатии удалятся сообщение.

// для полноценной проверки -- надо запустить сервер в папке code -- там без node модулей

// здесь -- части решения из разных файлов
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
  }
  // #region Удаление одного сообщения
  delMsg = document.getElementsByClassName(`close`);
  Array.from(delMsg).forEach((element) => {
    element.addEventListener("click", function () {
      event.target.parentNode.parentNode.remove();
    });
  });
  console.log(`delMsg`, delMsg);
});
// #endregion Удаление одного сообщения

// #region Очистка всего чата

const delConvButton = document.querySelector(`button[data-id="delConvButton"]`);
delConvButton.addEventListener("click", function () {
  window.localStorage.clear();
  let root = document.querySelector('div[data-id="chat"]');
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  // #endregion Очистка всего чата
});

// #endregion

// #region из data.js

export const Storage = {
  addMessage: function (item) {
    if (!window.localStorage["messages"]) {
      window.localStorage["messages"] = JSON.stringify([item]);
    } else {
      const messages = JSON.parse(window.localStorage["messages"]);
      console.log(`messages after parse`, messages);
      console.log(`typeof messages after parse`, typeof messages);
      messages.push(item);
      window.localStorage["messages"] = JSON.stringify(messages);
    }
  },
  getListMessage: function () {
    if (!window.localStorage["messages"]) {
      return [];
    }
    return JSON.parse(window.localStorage["messages"]);
  },
  // #region Удаление из localStorage

  delMsgData: function (item) {
    const messages = JSON.parse(window.localStorage["messages"]);
    messages.splice(messages.indexOf(item), 1);
    window.localStorage["messages"] = JSON.stringify(messages);
  },

  // #endregion Удаление из localStorage

  destroy: function () {
    window.localStorage.clear();
  },
};

// #endregion из data.js

// #region из файла стилей -- для отображения х по hover

/* .close {
  color: red;
  font-weight: bold;
  opacity: 0;

  &:hover {
    opacity: 1;
  }
} */

// #endregion из файла стилей -- для отображения х по hover
