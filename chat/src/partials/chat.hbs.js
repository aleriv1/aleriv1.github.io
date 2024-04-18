import Handlebars from "handlebars";

const messages = [
  { id: 1, id_user: 100, name: "VG", message: "Hello, how are you?" },
  { id: 2, id_user: 200, name: "NG", message: "Good" },
  { id: 3, id_user: 100, name: "VG", message: "What are you doing" },
  { id: 4, id_user: 200, name: "NG", message: "Let's walk" },
  { id: 5, id_user: 200, name: "NG", message: "Go" },
];

const tplMessage = `<div class="col-start-1 col-end-8 p-3 rounded-lg">
{{#each messages}}
<div class="flex flex-row items-center">
<div
class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
{{ name }}
</div>
<div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
<div>{{ message }}</div>
</div>
</div>
</div>;
{{/each}}`;

let temaplate = Handlebars.compile(tplMessage);
let htmlMenu = temaplate({ messages: messages });
console.log(htmlMenu);
Handlebars.registerPartial("chat", htmlMenu);
