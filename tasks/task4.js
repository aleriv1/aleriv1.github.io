//todo: Задано число. Проверить на  истинность (true или false) что
// сумма цифр данного трехзначного числа является четным числом. Числа меняются !
// Пример:

let x = 552;

// Сумма чисел: 5 + 5 + 2 = 12
// 12 - четное число (true)
// console.log(x - (x % 1000));

// #region task4, solution 1

console.log(`\n task 4, solution #1 \n\n`);

function numCheck(x) {
  console.log(`Число: ${x}`);
  if (x - (x % 1000) > 0) {
    console.log(
      `мы проверяем больше чем трёхначное число, проверка на это не расчитана`
    );
    return console.log(`stop`);
  } else {
    console.log(`число подходит для проверки, всё нормально, идём дальше`);
  }

  let n100 = (x - (x % 100)) / 100;
  let n10 = (x - (x - (x % 100)) - (x % 10)) / 10;
  let n1 = x % 10;
  let sumN = n100 + n10 + n1;

  console.log(`Сумма чисел ${n100} + ${n10} + ${n1} = ${sumN}`);

  // let sumCheck =
  sumN % 2 === 0
    ? console.log(`${sumN} -- чётное число (true)`)
    : console.log(`${sumN} -- нечётное число (false)`);
}

numCheck(552);

// #endregion task4, solution 1

// я немного в теме работы со строками, считаю, уместно использовать знания, тогда не важно, что больше, чем трёхзначное

console.log(`---`);

// #region task4, solution 2

console.log(`\n task 4, solution #2 \n\n`);

function numberSummEvenOdd(x) {
  let num = String(x);
  console.log(`Число:`, num);

  let numSum = 0;

  let sumStr = "Сумма чисел ";
  for (let i = 0; i < num.length; i++) {
    let numPart = +num.slice(i, i + 1);
    numSum = numSum + numPart;
    // console.log(`numSum is after ${i + 1} iteration:`, numSum);

    i !== num.length - 1
      ? (sumStr += `${numPart} + `)
      : (sumStr += `${numPart} = ${numSum}`);
  }
  console.log(sumStr);

  // console.log(`numSum after loop`, numSum);

  numSum % 2 == 0
    ? console.log(`${numSum} -- чётное число (true)`)
    : console.log(`${numSum} -- нечётное число (false)`);
}

let zNumberEvenOdd = numberSummEvenOdd(25552);

// #endregion task4, solution 2
