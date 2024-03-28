// Cгенерировать массив 6(строк) на 7(колонок),  который должнем быть заполнен днями в текущем месяце (календарь на месяц).
// Месяц задается произвольно. Календарь должен включать дни недели предыдущего месяца и последующего.
// В решении задачи воспользоваться стандартными функциями работы с датой и временем.
// https://learn.javascript.ru/datetime

let calendarArr = [];

let dN = 0;
for (let i = 0; i < 6; i++) {
  let calendarArrSub = [];
  const d = new Date();
  for (let iSub = 0; iSub < 7; iSub++) {
    // calendarArrSub.push(iSub);
    // calendarArrSub.push(2023, 2, -7);
    calendarArrSub.push(new Date(2011, 1, -7 + dN).toDateString());
    dN += 1;
  }

  calendarArr.push(calendarArrSub);
}
console.log(calendarArr);

console.log(`---`);

let now = new Date();
console.log(now);
// console.log(new Date(0));
// console.log(new Date(24 * 3600 * 1000));
