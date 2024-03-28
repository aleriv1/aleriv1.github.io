//todo: По массиву дат (task15) сгенерировать динамически сетку с датами на заданный месяц см. файл table.png

// #region task 15
console.log(`the code from the previous task15`);

let calendarArr = [];

let dN = 0;

// let date = new Date(2024, 2, -3 + dN);
let date;

for (let i = 0; i < 6; i++) {
  let calendarArrSub = [];
  for (let iSub = 0; iSub < 7; iSub++) {
    date = new Date(2024, 2, -3 + dN);
    // calendarArrSub.push(new Date(2024, 2, -3 + dN).getDate());
    // calendarArrSub.push(date.getDate());
    calendarArrSub.push(date);

    dN += 1;
  }

  calendarArr.push(calendarArrSub);
}
console.log(calendarArr);

// #endregion task 15

// #region task 16

console.log(`--- task 16`);

// #region main containers

const wrapper = document.createElement(`div`);
wrapper.classList.add(`wrapper`);
document.querySelector(`body`).appendChild(wrapper);

const gridContCalendar = document.createElement(`div`);
gridContCalendar.classList.add(`grid-cont-calendar`);
wrapper.appendChild(gridContCalendar);

// #endregion main containers

// #region weekDays
let weekDays = [
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
  `Sunday`,
];

for (let i = 0; i < weekDays.length; i++) {
  let weekDay = document.createElement(`div`);
  let weekDayName = document.createTextNode(weekDays[i]);
  weekDay.classList.add(
    `grid-cont-calendar__item`,
    `grid-cont-calendar__item_weekDayName`
  );
  weekDay.appendChild(weekDayName);

  console.log(weekDay);
  gridContCalendar.appendChild(weekDay);
}
// #endregion weekDays

for (let item of calendarArr) {
  for (let itemSub of item) {
    let gridContCallendarCell = document.createElement(`div`);

    let gridContCallendarCellContent = document.createTextNode(
      itemSub.getDate()
    );

    gridContCallendarCell.classList.add(`grid-cont-calendar__item`);

    // let testMonth = itemSub.getMonth();
    // testMonth === 2
    itemSub.getMonth() === 2
      ? gridContCallendarCell.classList.add(
          `grid-cont-calendar__item_current-month`
        )
      : gridContCallendarCell.classList.add(
          `grid-cont-calendar__item_not-current-month`
        );
    // ? console.log(`march`, testMonth):
    // console.log(`not march`, testMonth);

    gridContCallendarCell.appendChild(gridContCallendarCellContent);

    // .querySelector(`.grid-cont-calendar`)
    gridContCalendar.appendChild(gridContCallendarCell);
  }
}

console.log(gridContCalendar);

// #endregion task 16
