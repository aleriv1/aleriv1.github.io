// todo: Даны две переменные a, b им присвоены целочисленные значения.
// Необходимо программно поменять местами содержимое двух переменных, в b должно
// быть значение а и наоборот.

// #region solution #1

console.log(`\n task 1, solution #1 \n\n`);

let a = 12;
let b = 21;

console.log(`At first: let a = `, a, `let b = `, b);

let c = b;

b = a;
a = c;

console.log(`
let c = b;

b = a;
a = c;

`);

console.log(`At end: let a = `, a, `let b = `, b);

// #endregion solution #1

console.log(`---`);

// #region solution #1

console.log(`\n task 1, solution #2 \n\n`);

let a1 = 12;
let b1 = 13;
console.log(`At first: let a1 = `, a1, `let b1 = `, b1);

a1 = b1 - a1;

b1 = b1 - a1;

a1 = a1 + b1;

console.log(`
a1 = b1 - a1;

b1 = b1 - a1;

a1 = a1 + b1;

`);

console.log(`At end: let a1 = `, a1, `let b1 = `, b1);

// #endregion solution #1
