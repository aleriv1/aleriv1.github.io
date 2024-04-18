// alert(`Guess the number`);
// Нам надо ,чтобы пользователь что-то вводил, и система говорила, правильно или неправильно.

// let zCheck = check();

// function getRandomArbitrary(min, max) {
//   return Math.random() * (max - min) + min;
// }

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

// let random = getRandomArbitrary(1, 100);
let random = getRandomInt(1, 100);

console.log(random);

// let counter = 1;
let counter = 0;

function check() {
  // console.log("test"); //
  let answer = document.querySelector(".your-number");
  if (Number(answer.value) === random) {
    counter += 1;
    console.log(`You won!`);
    console.log(`Количество попыток:`, counter);
  } else {
    console.log(`try again`);
    // counter += 1;
  }
}
