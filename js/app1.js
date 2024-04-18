// console.log(`test`);

let x = 100;
let result = 0;

for (let i = 0; i <= 100; i++) {
  // result = result + i
  result += i;
}

console.log(`result:`, result);

let obj = { name: "Peter", age: "33" };

console.log(`"age" in obj:`, "age" in obj);

let mass = [
  { age: 10, name: "Peter" },
  { age: 200, name: "turtle" },
];

// Object access
console.log(mass[1].name);

let data = ["name1", "name2", "name3"];

let str = "<ul>";
// let body = "";

for (let item of data) {
  // console.log(item);
  // body += "<li>" + item + "</li>";
  str += "<li>" + item + "</li>";
  // console.log("<li>" + item + "</li>");
}
str += "</ul>";

console.log(str);

let dataSel;

// let node = document.querySelector("#name-dynamic-gen-0");
let node = document.querySelector(".test_dynamic-gen");
node.innerHTML = str;

let dataCities = [
  { id: 1, name: "Saint-Petersburg" },
  { id: 2, name: "Moscow" },
  { id: 3, name: "Sochi" },
];

// let strCities = `<label for="city-select">Ваш город</label>`;
// let strCities = `<select name="city" id="city-select">
let strCities = `<label for="city-select">Ваш город</label><select name="city" id="city-select">
`;

for (let item of dataCities) {
  // console.log(item);
  // body += "<li>" + item + "</li>";
  // strCities += "<li>" + item + "</li>";
  strCities += `<option value="${item.id}"> ${item.name} </options>`;

  // console.log("<li>" + item + "</li>");
}
strCities += "</select>";

console.log(strCities);

let nodeCities = document.querySelector(".cities");
nodeCities.innerHTML = strCities;

function getCity() {
  // console.log("getCity");
  let cityID = document.getElementById("city-select");
  console.log(cityID.value);
}
// console.log(body);

function add() {
  let x = 0;

  return;
}

let y = add();
console.log(y); // без return -- undefined; если return просто без всего -- тоже undifined

function addR() {
  let x = 0;

  return x;
}

let yR = addR();
console.log(yR); // если return с чем-то -- будет это

let objNew = { age: 10 }; // здесь иниализация
objNew.name = "Peter"; //  здесь присваоили значение -- так тоже можно

// console.log(`objNew is:`, objNew.name);

objNew.get = function get() {
  // console.log("get!!!");
  // console.log(this.name);
  console.log(this.name);
  return this.name;
};

objNew.set = function (val) {
  this.name = val;
};

objNew.set("Ам");

// console.log("objNew:", objNew.get());
console.log("objNew:", objNew.get());

// x = 3;
// x.name = "Peter";
