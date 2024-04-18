// #region
// console.log(`test`);

function cheer(score) {
  if (score === 147) {
    return "Maximum!";
  }

  if (score > 100) {
    return "another";
  }
}

function add(x, y) {
  var total = x + y;
  return total;
}

z = add(2, 3, 4); // apply или call -- вызов функции

// console.log(z);

console.log(`add(2, 3, 4) is:`, add(2, 3, 4));

// #endregion

// let sum;
function add() {
  let sum = 0;
  // var sum = 0;

  let j = arguments.length;

  for (var i = 0; i < j; i++) {
    sum += arguments[i];
  }

  return sum;
}

// console.log(`sum`, sum);

let zFun = add(10, 2);
console.log(zFun);

// console.log(add(2, 7).sum);

// console.log(`add(2,3) is:`, add(2, 3));

// #region Перегрузка функции

// Перегрузка функции -- её здесь в нормальном виде нет (разное количество элементов -- и это всё )

function summ(x, y) {
  return x + y;
}

function summ(x, y, z) {
  return x + y + z;
}

console.log(summ(5, 7));

// todo: to understand return -- NaN in comapre with function with arguments

// #endregion Перегрузка функции

// #region callback

function summ(x, y) {
  return x + y;
}

// function calc(fn) {
function calc(fn, x, y) {
  return fn(10, 3);
}

console.log(`calc(summ), Lilya number is:`, calc(summ));

// #endregion callback

// #region funtiocn and object

let obj = {
  name: `barsik`,
  meo: function () {
    // console.log(this.name);
    return this.name;
  },
};

console.log(obj.meo());

// #endregion funtiocn and object

// #region arrow function

const summ_ = (x, y) => {
  return x + y;
};

console.log(`summ_(3, 10)`, summ_(3, 10));

// как пример на калькуляторе

calc(
  (x, y) => {
    return x + y;
  },
  2,
  4
);

// #endregion arrow function
