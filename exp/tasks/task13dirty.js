//todo: В массиве размерности 10, найти минимальный и максимальный элементы, поменять их местами.

let arr = [2, 3, 1, 10, 12, 15, 7, 8, 13, 11];
let arr1 = [2, 3, 1, 10, 12, 15, 7, 8, 13, 11];

console.log(`arr1 min is:`, Math.min.apply(null, arr1));

let arr1Min = Math.min.apply(null, arr1);
let indArr1Min = arr1.indexOf(arr1Min);
let arr1Max = Math.max.apply(null, arr1);
let indArr1Max = arr1.indexOf(arr1Max);

console.log(
  `arr1 max is`,
  Math.max.apply(null, arr1),
  `its index is ${indArr1Max}`
);

console.log(
  `arr1 min is`,
  Math.max.apply(null, arr1),
  `its index is ${indArr1Min}`
);

console.log(`arr1 is:`, arr1);
arr1.splice(indArr1Min, 1, arr1Max);
// console.log(`arr1 is:`, arr1);
arr1.splice(indArr1Max, 1, arr1Min);
console.log(`arr1 is:`, arr1);

console.log(`---`);

// #region

// let arrComp = arr;
let arrComp = [];
for (let i = 0; i < arr.length; i++) {
  arrComp.push(arr[i]);
}

console.log(`arrComp is:`, arrComp);

console.log(arrComp);

function compare(a, b) {
  if (a > b) return 1;
  if (a === b) return 0;
  if (a < b) return -1;
}

console.log(arrComp.sort(compare));

let arrMin = arrComp[0];
console.log(arrMin);
let arrMax = arrComp[arrComp.length - 1];
console.log(arrMax);

// console.log(`Минимальное значение в массиве ${arrComp[0]}`);
console.log(`Минимальное значение в массиве ${arrMin}`);
console.log(`Минимальное значение в массиве ${arrMax}`);

console.log(arrComp);

arrComp.pop();
arrComp.shift();
arrComp.unshift(arrMax);
arrComp.push(arrMin);

console.log(`arr is:`, arr);
console.log(`arrComp is:`, arrComp);

console.log(`Индекс минимально значения массива:`, arr.indexOf(arrMin));
let indexArrMin = arr.indexOf(arrMin);
console.log(`Индекс максимального значения массива:`, arr.indexOf(arrMax));
let indexArrMax = arr.indexOf(arrMax);

console.log(`arr is:`, arr);

// arr[arr.indexOf(arrMin)] = arrMax;
arr.splice(indexArrMin, 1, arrMax);
arr.splice(indexArrMax, 1, arrMin);
// arr.splice(arr.indexOf(arrMax), 1, arrMin);
// arr[arr.indexOf(arrMax)] = arrMin;

console.log(`arr is:`, arr);

// #endregion
