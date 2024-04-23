console.log("app.js")
import Handlebars from "handlebars";
import {v4 as uuidv4} from 'uuid';

import { Chat } from "./portial/chat.hbs"
import { tmplLayout }  from './layout'
import "./portial/button.hbs"

Chat.init()
let template = Handlebars.compile(tmplLayout)
let htmlApp = template()
let root = document.getElementById("app")
root.innerHTML = htmlApp

const button = document.querySelector('button[data-id="sendButton"]')
button.addEventListener('click', function () { 
    const inputDOM = document.querySelector('input[data-id="message"]')
    if (inputDOM.value) {
       let myuuid = uuidv4();
        let item = { id: myuuid, id_user: 100, name: 'VG', message: inputDOM.value }
        Chat.addMessage(item)
       console.log(item)  
    }
} )