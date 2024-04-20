import Handlebars from "handlebars";

import { messages } from "./data";

// const messages = [
//   { id: 1, id_user: 100, name: "VG", message: "Привет как дела" },
//   { id: 2, id_user: 200, name: "NG", message: "хорошо" },
//   { id: 3, id_user: 100, name: "VG", message: "Пойдем погуляем!" },
//   { id: 4, id_user: 200, name: "NG", message: "Привет как дел" },
//   { id: 5, id_user: 100, name: "VG", message: "выхожу" },
// ];

const userID = 100;
const tplMessage = `

{{#each messages}} 
{{#if (checkUser id_user)}}
<div class="col-start-1 col-end-8 p-3 rounded-lg">
<div class="flex flex-row items-center">
    <div
        class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
       {{ name }}
    </div>
    <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
        <div>{{ message }}</div>
    </div>
</div>
</div>
{{else}}
<div class="col-start-6 col-end-13 p-3 rounded-lg">
         <div class="flex items-center justify-start flex-row-reverse">
              <div
                 class="flex items-center justify-center h-10 w-10 rounded-full bg-red-500 flex-shrink-0">
                    {{ name }}
                     </div>
                    <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                     <div>{{ message }}</div>

              </div>
        </div>
    </div>
{{/if}}
{{/each}}`;

export const Chat = {
  data: messages,
  tmpl: tplMessage,
  init: function () {
    Handlebars.registerHelper("checkUser", function (currIDUser) {
      return currIDUser == userID;
    });
    Chat.render();
  },

  addMessage: function (item) {
    Chat.data.push(item);
    Caht.partialRender(item);
  },

  render: function () {
    let template = Handlebars.compile(Chat.tmpl);
    let htmlChat = template({ messages: Chat.data, userID: userID });
    Handlebars.registerPartial("chat", htmlChat);
    // let root = document.querySelector('div[data-id="chat"]');
    // root.innerHTML = htmlChat;
  },

  partialRender: function (item) {
    let template = Handlebars.compile(Chat.tmpl);
    let htmlItem = template({ messages: [item], userID: userID });
    console.log(htmlItem);
    let root = document.querySelector('div[data-id="chat"]');
    root.innerHTML = root.innerHTML + htmlItem;
  },
};

// Chat.init();

// Handlebars.registerHelper("checkUser", function (currIDUser) {
//   return currIDUser == userID;
// });

// let template = Handlebars.compile(tplMessage);
// let htmlChat = template({ messages: messages, userID: userID });
// Handlebars.registerPartial("chat", htmlChat);
// let root = document.querySelector('div[data-id="chat"]');
// root.innerHTML = htmlChat;

// ---

// import Handlebars from "handlebars";

// const messages = [
//   { id: 1, id_user: 100, name: "VG", message: "Hello, how are you?" },
//   { id: 2, id_user: 200, name: "NG", message: "Good" },
//   { id: 3, id_user: 100, name: "VG", message: "What are you doing" },
//   { id: 4, id_user: 200, name: "NG", message: "Let's walk" },
//   { id: 5, id_user: 200, name: "NG", message: "Go" },
// ];

// let userID = 100;

// const tplMessage = `
// {{#each messages}}

// {{#if (checkUser id_user) }}

// <diVjv class="col-start-1 col-end-8 p-3 rounded-lg">
// <div class="flex flex-row items-center">
//     <div
//         class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
//         {{ name }}A
//     </div>
//     <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
//         <div>{{ message }}</div>
//     </div>
// </div>
// </div>

// {{else}}

// <div class="col-start-6 col-end-13 p-3 rounded-lg">
//       <div class="flex items-center justify-start flex-row-reverse">
//           <div
//               class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
//               {{ name }}
//           </div>
//           <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
//               <div>{{ message }}</div>
//           </div>
//       </div>
//   </div>

// {{/if}}

// {{/each}}
// `;

// Handlebars.registerHelper("checkUser", function (currIdUser) {
//   return currIdUser == userID;
// });

// // {{#if author}}
// // <h1>{{firstName}} {{lastName}}</h1>
// // {{else}}
// // <h1>Unknown Author</h1>
// // {{/if}}

// let temaplate = Handlebars.compile(tplMessage);
// let htmlChat = temaplate({ messages: messages, userID: userID });
// console.log(htmlChat);
// Handlebars.registerPartial("chat", htmlChat);

// let root = document.querySelector(`div[data-id="chat"]`);

// root.innerHTML = htmlChat;
