//todo: В массиве размерности 10, найти минимальный и максимальный элементы, поменять их местами.

// #region #13 // Использовал знания, полученные из "Литературного чтения"

let arr = [2, 3, 1, 10, 12, 15, 7, 8, 13, 11];
// let arrComp = arr;
let arrComp = []; // массив для манипуляций, чтобы в оригинальномм потом поменять местами значения, не сортируая его

for (let i = 0; i < arr.length; i++) {
  arrComp.push(arr[i]);
}

console.log(`Оригинальный массив, arr:`, arr);
console.log(`---`);

console.log(`Массив для манипуляций, arrComp:`, arrComp);
console.log(`---`);

function compare(a, b) {
  if (a > b) return 1;
  if (a === b) return 0;
  if (a < b) return -1;
}

console.log(
  `Массив для манипуляций после сортировки, arrComp:`,
  arrComp.sort(compare)
);
console.log(`---`);

let arrMin = arrComp[0];
let arrMax = arrComp[arrComp.length - 1];

console.log(`Минимальное значение в массиве ${arrMin}`);
console.log(`Минимальное значение в массиве ${arrMax}`);
console.log(`---`);

arrComp.pop();
arrComp.shift();
arrComp.unshift(arrMax);
arrComp.push(arrMin);
console.log(`Массив для манипуляций после перемены значений, arrComp`, arrComp);

console.log(`---`);

// ---

console.log(`Оригинальный массив, arr:`, arr);

let indexArrMin = arr.indexOf(arrMin);
console.log(`Индекс минимального значения массива:`, indexArrMin);

let indexArrMax = arr.indexOf(arrMax);
console.log(`Индекс максимального значения массива:`, indexArrMax);
console.log(`---`);

console.log(`Оригинальный массив до перемены:`, arr);

arr.splice(indexArrMin, 1, arrMax);
arr.splice(indexArrMax, 1, arrMin);

console.log(`Оригинальный массив после перемены `, arr);

// #endregion #13
