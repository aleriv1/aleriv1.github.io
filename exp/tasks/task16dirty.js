//todo: По массиву дат (task15) сгенерировать динамически сетку с датами на заданный месяц см. файл table.png

let calendarArr = [];

let dN = 0;
// const d = new Date(2011, 2, -6 + dN).toDateString();

for (let i = 0; i < 6; i++) {
  let calendarArrSub = [];
  for (let iSub = 0; iSub < 7; iSub++) {
    // calendarArrSub.push(d);
    // calendarArrSub.push(iSub);
    calendarArrSub.push(new Date(2024, 2, -3 + dN).toDateString());
    dN += 1;
  }

  calendarArr.push(calendarArrSub);
}
console.log(calendarArr);

console.log(`---`);

const gridContCalendar = document.createElement(`div`);
gridContCalendar.classList.add(`grid-cont-calendar`);
document.querySelector(`body`).appendChild(gridContCalendar);
// console.log(`lilya`);

// let gridContCallendarCell = document.createElement(`div`);
// gridContCallendarCell.classList.add(`grid-cont__item`);

for (let item of calendarArr) {
  // for (let i=0; i < calendarArr.length; i++) {
  // const gridContCallendarCell = document.createElement(`div`);

  for (let itemSub of item) {
    let gridContCallendarCell = document.createElement(`div`);
    let gridContCallendarCellContent = document.createTextNode(itemSub);
    gridContCallendarCell.classList.add(`grid-cont-calendar__item`);
    gridContCallendarCell.appendChild(gridContCallendarCellContent);

    // console.log(itemSub);
    document
      .querySelector(`.grid-cont-calendar`)
      .appendChild(gridContCallendarCell);
    // .appendChild(document.createElement(`div`));
    // console.log(`lilya`);
  }
}
