// if (window.localStorage.getItem("basket")) {
//     alert("Работает LOCAL STORAGE")
//     let basket = JSON.parse(window.localStorage.getItem("basket"))
//     console.log(basket)
//     basket.init()
// } else {
// Заход первый раз.
let basket = {
  // tmpl: <div>${el.price}</div>,
  button: document.querySelector("button[name='button-basket']"),
  root: document.querySelector("div[name='basket']"),
  rootTotal: document.querySelector("div[name='total']"),
  amount: 0,
  total: 0,
  items: [],

  setBasketStorage: function () {
    window.localStorage.setItem("basket", JSON.stringify(this));
  },

  init: function () {
    if (window.localStorage.getItem("basket")) {
      alert("Работает LOCAL STORAGE");
      let basket = JSON.parse(window.localStorage.getItem("basket"));
      this.amount = basket.amount;
      this.total = basket.total;
      this.items = basket.items;
    }

    this.button.addEventListener("click", (event) => {
      basket.render();
      event.target.style.visibility = "hidden";
    });
  },
  addItem: function (el) {
    this.amount += 1;
    this.items.push(el);
    this.calcCash();
    this.setBasketStorage();
  },

  delItem: function (id) {
    alert("delItem");
    this.amount -= 1;
    this.items = this.items.filter((el) => el.id != id);
    this.calcCash();
    this.setBasketStorage();
    this.render();
  },
  calcCash: function () {
    this.total = 0;
    this.items.forEach((el) => {
      this.total += el.price * el.amount * (1 - el.discont);
    });
  },

  changeAmount: function (event, id) {
    alert("changeAmount");
    console.log(event.target.value);
    console.log(id);
    this.items.filter((el) => {
      el.amount = el.id == id ? event.target.value : el.amount;
    });
    this.calcCash();
    this.setBasketStorage();
    this.renderTotal();
    //todo: релизовать логику уменьшения кол-ва товаров по id
  },
  render: function () {
    let html = "";
    this.items.forEach((el) => {
      html += `<div class="flex gap-2"><div>${el.name} </div>
              <div>${el.price} </div> 
              <input onchange=basket.changeAmount(event,${el.id}) id="number" type="number" value="${el.amount}" />
                                              
              <button onclick=basket.delItem(${el.id})   data-id=${el.id} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">X</button></div>`;
    });
    this.root.innerHTML = html;
    this.renderTotal();
  },
  renderTotal: function () {
    this.rootTotal.innerHTML = `<div>Итого: ${this.total} руб.</div>`;
  },
};

basket.init();
function Item(id, name, price, desc, amount, discont) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.discont = discont;
  this.desc = desc;
  this.amount = amount;
}

let item = new Item(1, "Car", 1000000, "Super car", 2, 0);
basket.addItem(item);
// basket.addItem(item)
// console.log('Сумма 1:', basket.total)

let item_ = new Item(2, "Car", 1000000, "Super car 2", 1, 0);
basket.addItem(item_);
// console.log('Сумма 2:', basket.total)
// console.log('Кол-во товаров после удаления', basket.items.length)

// }
