// #region task1

// console.log(`test`);
let chessBoard = [];

// for (let i = 0; i < 4; i++) {
for (let i = 0; i < 8; i++) {
  let iSubArr = [];
  //
  for (let iSub = 0; iSub < 8; iSub++) {
    // iSubArr.push(null);
    iSubArr.push("");
    // iSubArr.push(iSub + 1);
  }

  // if ((i + 1) % 2 !== 0) {

  // if ((i + 1) % 2 !== 0) {
  // for (let iSub = 0; iSub < 8; iSub++) {
  // iSubArr.push(iSub + 1);
  // }
  // } else {
  // for (let iSub = 0; iSub < 8; iSub++) {
  // iSubArr.push(iSub + 2);
  // }
  // }
  //

  chessBoard.push(iSubArr);
}

chessBoard[0][0] = "black rook";
chessBoard[0][3] = "black king";
chessBoard[7][1] = "white queen";
chessBoard[7][6] = "white king";

console.log(chessBoard);

// #endregion task 1
console.log("//---");
// #region task 2

// let chessStr = `<div class='grid-cont'>`;
// let chessStr = "";
let chessStr = " ";

for (let item of chessBoard) {
  // console.log(item);

  for (let itemSub of item) {
    // console.log(itemSub);

    chessStr += `<div class="grid-cont__item">${itemSub}</div>`;

    // if ((item.indexOf(itemSub) + 1) % 2 != 0) {
    //   chessStr += `<div class="grid-cont__item">${itemSub}</div>`;
    // } else {
    //   chessStr += `<div class="grid-cont__item" style="background:#00000077">${itemSub}</div>`;
    // }
  }
}

// chessStr += "</div>";
console.log("//---");
console.log(chessStr);
let gridCont = (document.querySelector(".grid-cont").innerHTML = chessStr);

let gridItem;
// #endregion task 2

// #region task 3

const queue = ["Иван", "Мария", "Саша", "Даша"];
const outside = ["Aмфибрахий"];

outside.unshift(queue.pop());
outside.unshift(queue.shift());
queue.push(outside.pop());
// console.log(String(queue));

console.log("В очереди: " + queue + "\n " + "Вне банка: " + outside);

// console.log(queue.shift(), queue);
// console.log(queue.pop(), queue);
// console.log(queue.push(`Амфибрахий`), queue);

// #endregion task 3
