// console.log(`lilya`);

let basket = {
  // tmpl: `<div>${el.price}</div>`
  button: document.querySelector(`button[name="button-basket"]`),
  root: document.querySelector(`div[name="basket"]`),
  rootTotal: document.querySelector(`div[name="total"]`),

  amount: 0,
  total: 0,
  items: [],

  init: function () {
    this.button.addEventListener(`click`, (evenl) => {
      basket.render();
      event.target.style.visibility = `hidden`;
    });
  },

  // id: 0,
  // price: ``,
  // desc: ``,
  // discont: ``,

  addItem: function (el) {
    this.amount += 1;
    this.items.push(el);
    this.calcCash();
  },
  delItem: function (id) {
    this.amount -= 1;
    this.items = this.items.filter((el) => el.id != id);
    this.calcCash();
  },
  calcCash: function () {
    this.total = 0; // присвоение
    this.items.forEach((el) => {
      this.total += el.price * el.amount * (1 - el.discont);
    });
  },
  changeItem: function (id, newAmount) {
    // todo: реализовать логику умеьшения количества товаров
  },

  render: function () {
    let html = ``;
    this.items.forEach((el) => {
      html += `<div class="flex"><div>${el.name}</div>${el.price}</div>`;
    });
  },

  renderTotal: function () {
    let htmlTotal = `<div>итого: ${this.total} руб</div>`;
  },
};

basket.init();

// let item = {
//   id: 0,
//   name: ``,
//   price: ``,
//   desc: ``,
//   amount: 0,
// };

// порождающая функция
function Item(id, name, price, discont, desc, amount) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.discont = discont;
  this.desc = desc;
  this.amount = amount;
}

let item = new Item(1, `Car`, 1000000, `Super car`, 2, 0.1);
basket.addItem(item);
// console.log(`Сумма 1:`, basket.total);
console.log(`Сумма 1:`, basket.amount);

let item_ = new Item(2, `Car`, 1000000, `Super car`, 2, 0.2);
basket.addItem(item_);
// console.log(`Сумма 2:`, basket.total);
console.log(`Сумма 2:`, basket.amount);

// console.log(`item is:`, item);
// console.log(`item_ item`, item_);

console.log(`Количество товаров:`, basket.items.length);

basket.delItem(1);
console.assert(basket.items.length == 1, `В корзине 1 элемент`);
console.log(`Количество товаров после удаления`, basket.items.length);

// basket.render();
