// console.log(`lilya`);

import { v4 as uuidv4 } from "uuid";

let myuuid = uuidv4();

console.log("Your UUID is: " + myuuid);

import "./partials/chat.hbs.js";

import Handlebars from "handlebars";

import { Chat } from "./partials/chat.hbs.js";
Chat.init();

const template = Handlebars.compile("Name: {{name}}");
console.log(template({ name: "lilya" }));

const button = document.querySelector(`button[data-id="sendButton"]`);
// console.log(button);

button.addEventListener(`click`, function () {
  console.log(`lilya,lilya`);
  const inputDom = document.querySelector(`input[data-id="message"]`);

  // let item = { id: myuuid, id_user: 100, name: "VG", message: "выхожу" };
  let item = { id: myuuid, id_user: 100, name: "VG", message: inputDom.value };

  console.log(item);
  console.log(`message:`, inputDom.value);
  Chat.partialRender(item);
});
