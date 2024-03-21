// console.log(`test`);
let chessBoard = [];

// for (let i = 0; i < 4; i++) {
for (let i = 0; i < 8; i++) {
  let iSubArr = [];
  for (let isub = 0; isub < 8; isub++) {
    iSubArr.push(null);
  }
  chessBoard.push(iSubArr);
}

chessBoard[0][0] = "black rook";
chessBoard[0][3] = "black king";
chessBoard[7][1] = "white queen";
chessBoard[7][6] = "white king";

console.log(chessBoard);
