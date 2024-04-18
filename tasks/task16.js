//todo: По массиву дат (task15) сгенерировать динамически сетку с датами на заданный месяц см. файл table.png

console.log(`lilya`);

// #region task 15
console.log(`the code from the previous task15`);

let calendarArr = [];

// let dN = 0;
let dN = 1;

// let date = new Date(2024, 2, -3 + dN);
let date;

function dateArr(monthAdd = 0) {
  for (let i = 0; i < 6; i++) {
    let calendarArrSub = [];
    for (let iSub = 0; iSub < 7; iSub++) {
      // date = new Date(2024, 2 + monthAdd, -3 + dN);
      date = new Date(2024, 2 + monthAdd, -4 + dN);
      console.log(date.getDay());
      // date = new Date(2024, 2 + monthAdd, dN);
      calendarArrSub.push(date);

      dN += 1;
    }

    calendarArr.push(calendarArrSub);
  }
  console.log(calendarArr);
}

let zDateArr = dateArr();

// #endregion task 15

// #region task 16

console.log(`--- task 16`);

// #region main containers create

const wrapper = document.createElement(`div`);
const gridContCalendar = document.createElement(`div`);

// #region month buttons

function monthBtnNext() {
  let monthBtn = document.createElement(`button`);
  monthBtn.classList.add(`button`);
  monthBtn.setAttribute(`type`, `button`);
  monthBtn.addEventListener(`click`, changeMonth);
  wrapper.appendChild(monthBtn);
}

function changeMonth(sn) {
  console.log(`click`);
  // return fn(n);
  dateArr(1);

  wrapper.removeChild(gridContCalendar);

  // gridContCalendar.classList.add(`grid-cont-calendar`);
  wrapper.appendChild(gridContCalendar);

  // gridContCalendar.removeChild(gridContCallendarCell);
  dateAdd();
}

let zMonthBtnNext = monthBtnNext();

// #endregion month buttons

function creatElms() {
  wrapper.classList.add(`wrapper`);
  document.querySelector(`body`).appendChild(wrapper);

  gridContCalendar.classList.add(`grid-cont-calendar`);
  wrapper.appendChild(gridContCalendar);
}

let zCreatElms = creatElms();

// #endregion main containers create

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

function weekDaysAdd() {
  for (let i = 0; i < weekDays.length; i++) {
    let weekDay = document.createElement(`div`);
    let weekDayName = document.createTextNode(weekDays[i]);
    weekDay.classList.add(
      `grid-cont-calendar__item`,
      `grid-cont-calendar__item_weekDayName`
    );
    weekDay.appendChild(weekDayName);

    // console.log(weekDay);
    gridContCalendar.appendChild(weekDay);
  }
}
let zWeekDaysCrAdd = weekDaysAdd();

// #endregion weekDays

// #region dateAdd(), etc

let gridContCallendarCell;
let gridContCallendarCellContent;

function dateAdd() {
  for (let item of calendarArr) {
    for (let itemSub of item) {
      gridContCallendarCell = document.createElement(`div`);

      gridContCallendarCellContent = document.createTextNode(itemSub.getDate());

      gridContCallendarCell.classList.add(`grid-cont-calendar__item`);

      itemSub.getMonth() === 2
        ? gridContCallendarCell.classList.add(
            `grid-cont-calendar__item_current-month`
          )
        : gridContCallendarCell.classList.add(
            `grid-cont-calendar__item_not-current-month`
          );

      gridContCallendarCell.appendChild(gridContCallendarCellContent);

      gridContCalendar.appendChild(gridContCallendarCell);
    }
  }

  // console.log(gridContCalendar);
}

let zDateAdd = dateAdd();

// #endregion dateAdd(), etc

// #endregion task 16
