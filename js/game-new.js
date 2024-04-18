// console.log(`test`);
function game(event) {
  // console.log(`name.target`);
  console.log(event.target);
  let node = event.target;
  node.append(document.createElement("div"));
}

let root = document.querySelector("#field");
// root.addEventListener("click", game());
root.addEventListener("click", game);
// root.addEventListener("click", "game");
