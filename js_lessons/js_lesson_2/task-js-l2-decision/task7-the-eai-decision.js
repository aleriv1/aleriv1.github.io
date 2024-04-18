//todo: Из предыдущего задания (task6) сгенерируйте динамически шахматное поле из массива в HTML
// и раставьте шахматы в соответсвующем порядке.

// #region task1

// console.log(`test`);
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
