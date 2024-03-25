// todo: Даны три переменные a и b и с им присвоены целочисленные значения.
// Необходимо вывести значения по возрастанию.
// Пример:
let a = 10;
let b = 7;
let c = 8;

// Вывод: 7 8 10

// #region task2, solution #1

console.log(`\n task 2, solution #1 \n\n`);

let incrRec = "";

if (a > b) {
  if (b > c) {
    incrRec = `${c} ${b} ${a}`;
  } else if (a > c) {
    incrRec = `${b} ${c} ${a}`;
  } else {
    incrRec = `${b} ${a} ${c}`;
  }
} else {
  if (a > c) {
    incrRec = `${c} ${a} ${b}`;
  } else if (b > c) {
    incrRec = `${a} ${c} ${b}`;
  } else {
    incrRec = `${a} ${b} ${c}`;
  }
}

console.log(`
let a = 10;
let b = 7;
let c = 8;

if (a > b) {
  if (b > c) {
    incrRec = \`${c} ${b} ${a}\`;
  } else if (a > c) {
    incrRec = \`${b} ${c} ${a}\`;
  } else {
    incrRec = \`${b} ${a} ${c}\`;
  }
} else {
  if (a > c) {
    incrRec = \`${c} ${a} ${b}\`;
  } else if (b > c) {
    incrRec = \`${a} ${c} ${b}\`;
  } else {
    incrRec = \`${a} ${b} ${c}\`;
  }
}

`);

console.log(`sorted variables:`, incrRec);

// #endregion task2, solution #1

console.log(`---`);

// #region task2, solution #2

console.log(`\n task 2, solution #2 \n\n
я в курсе, что можно добавлять в и массив сортировать его \n\n`);

const incrArr = [];

incrArr.push(a, b, c);
console.log(`incrArr before sort:`, incrArr);

incrArr.sort(function (a, b) {
  return a - b;
});

console.log(`incrArr after sort`, incrArr);

// #endregion task2, solution #2
