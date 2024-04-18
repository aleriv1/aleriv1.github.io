import Handlebars from "handlebars";

// console.log(`lilya`);
// with -- оператор контекста
// helper -- вспомогательные функции
// Комментарии неоходимы
// Каждый js должен быть закачан на сервер -- оттуда будет отдаваться

// Компиляция шаблона

import { _menu } from "./partial/menu.hbs.js";
import { _footer } from "./partial/footer.hbs.js";

// let menu = Handlebars.compile(`<li>{{link_one}}</li><li>{{ link_two }}</li>`);
let menu = Handlebars.compile(_menu);

// регистрация плоского
let htmlMenu = menu({ link_one: `Главная`, link_two: `О нас` });
// let htmlMenu = menu(menu);

let template = Handlebars.compile(`<div>отладка</div>`);
// let template = Handlebars.compile(`<div>
//       {{> menu}}

//     <div class="entry">
//       {{#if author}}
//       <h1>{{firstName}} {{lastName}}</h1>
//       {{/if}}
//       </div>

//       {{> footer}}
//       </div>`);

// регистрация в качестве объекта меню
Handlebars.registerPartial(
  "menu",
  // "<li>Главная</li><li>О нас</li>"
  // "<li>{{link_one}}</li><li>{{ link_two }}</li>"
  htmlMenu
);

// let footer = Handlebars.compile(`<div>{{company}}@copy</div>`);
let footer = Handlebars.compile(_footer);
let htmlFooter = footer({ company: `lilya` });

Handlebars.registerPartial(
  "footer",
  // "<divv>@copy</div>"
  htmlFooter
);

// let body = { body: `contnent` }
let body = {
  author: true,
  // author: false,
  firstName: "Yehuda",
  lastName: "Katz",
};

let str = template(body);
let root = document.querySelector(`#root`);
root.innerHTML = str;
