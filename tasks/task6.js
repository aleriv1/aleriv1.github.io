// todo: Сохраните результат шахматной партии в виде двухмерного массива board, называть фигуры можно
// произвольно, например “black queen”.

// #region task6

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

// #endregion task6
