// исходный код
const user = {
  id: 7,
  name: "Bob",
  token: 12343423,
};

// console.log(`test`);

//todo 9.1 Получите из объекта user значение id и разместите его в константу userId не используя выражение user.id.

let userId = ({ id } = user).id;
console.log(`userId is:`, userId);

//todo 9.2 Создайте новый объект на базе объекта user без свойства token через деструктуризацию объекта

let { token, ...userN } = user;
console.log(`user is`, user);
console.log(`userNew is:`, userN);

//todo 9.3 Заморозьте объект user, так чтобы в него нельзя было добавить свойства.

// Из дополнительного чтения !!!

Object.freeze(userN);
console.log(`Objectj.isFrozen(userN) is:`, Object.isFrozen(userN));

//todo 9.4 Создайте на базе объекта user новый объкт с доп. полями login и password

const userNew = {
  ...user,
  login: "user_password",
  password: "user_password",
};
console.log(`userNew`, userNew);

//todo 9.5 Добавьте к объекту user метод getId который возвращает свойство id

user.getId = function () {
  return this.id;
};

console.log(user.getId());

//todo 9.6 Добавьте к объекту user метод setId который утанавливает свойство id

user.setId = function (idValue) {
  this.id = idValue;
};
user.setId(13);
console.log(user.getId());

//todo 9.7 Проитерируйте объект user так чтобы при итерации можно было получить его ключ и значение.

for (const x of Object.entries(user)) {
  console.log(`key is:`, x[0], `;`, `value is:`, x[1]);
}

//todo 9.8 Сериализуйте объект в json

const userJson = JSON.stringify(user);
console.log(`userJson is:`, userJson);

//todo 9.8 Преобразуйте объект в ассоциативный массив.

let arrA = [];

for (const x of Object.entries(user)) {
  arrA.push(x);
}

console.log(`arrA is:`, arrA);
