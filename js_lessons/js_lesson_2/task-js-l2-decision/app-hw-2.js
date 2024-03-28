// #region task1

let chessBoard = [];

for (let i = 0; i < 8; i++) {
  let iSubArr = [];
  //
  for (let iSub = 0; iSub < 8; iSub++) {
    iSubArr.push("");
  }

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
let chessStr = "";

for (let item of chessBoard) {
  // console.log(item);

  for (let itemSub of item) {
    // console.log(itemSub);

    chessStr += `<div class="grid-cont__item">${itemSub}</div>`;
  }
}

// chessStr += "</div>";

console.log(chessStr);
let gridCont = (document.querySelector(".grid-cont").innerHTML = chessStr);

// #endregion task 2

console.log("//---");

// #region task 3

const queue = ["Иван", "Мария", "Саша", "Даша"];
const outside = ["Aмфибрахий"];

outside.unshift(queue.pop());
outside.unshift(queue.shift());
queue.push(outside.pop());

console.log("В очереди: " + queue + "\n " + "Вне банка: " + outside);

// #endregion task 3
