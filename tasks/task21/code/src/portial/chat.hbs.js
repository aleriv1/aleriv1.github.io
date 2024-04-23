import Handlebars from "handlebars";
import { Storage } from "./data";

const userID = 100;

const tplMessage = `
   {{#each messages}}
   {{#if (checkUser id_user) }}
    <div class="col-start-1 col-end-8 p-3 rounded-lg">
        <div class="flex flex-row items-center">
            <div
                class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                {{  name }}
            </div>
            <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl flex">
                <div>{{ message }}</div>
                <p class="close ml-4">X</p>
            </div>
        </div>
    </div>
    {{else}}
    <div class="col-start-6 col-end-13 p-3 rounded-lg">
        <div class="flex items-center justify-start flex-row-reverse">
            <div
                class="flex items-center justify-center h-10 w-10 rounded-full bg-red-500 flex-shrink-0">
                {{  name }}
            </div>
            <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                <div>{{ message }}</div>
            </div>
        </div>
    </div>
    {{/if}}
    {{/each}}`;

export const Chat = {
  data: Storage.getListMessage,
  tmpl: tplMessage,
  init: function () {
    Handlebars.registerHelper("checkUser", function (currIdUser) {
      return currIdUser == userID;
    });
    Chat.render();
  },
  addMessage: function (item) {
    Storage.addMessage(item);
    Chat.partialRender(item);
  },

  render: function () {
    let template = Handlebars.compile(Chat.tmpl);
    let htmlChat = template({ messages: Chat.data, userID: userID });
    Handlebars.registerPartial("chat", htmlChat);
  },
  partialRender: function (item) {
    let template = Handlebars.compile(Chat.tmpl);
    let htmlItem = template({ messages: [item] });
    let root = document.querySelector('div[data-id="chat"]');
    root.innerHTML = root.innerHTML + htmlItem;
    console.log(htmlItem);
  },

  delMsg: function () {
    let closeEl = document.querySelector(`.close`);
  },
};
