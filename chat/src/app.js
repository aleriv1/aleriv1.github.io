// console.log(`lilya`);

import "./partials/chat.hbs.js";

import Handlebars from "handlebars";
const template = Handlebars.compile("Name: {{name}}");
console.log(template({ name: "lilya" }));
