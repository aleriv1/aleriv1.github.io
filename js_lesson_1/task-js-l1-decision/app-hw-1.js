// #region task0-0

let result = 8;
let multiplier;
multiplier = 2.5;

result = (8 * multiplier + 674) / 3.3;

console.log(`multiplier !== '2,5':`, multiplier !== "2,5");
// true

let cat = `Кот Василий`;
console.log(`let cat =`, cat);

// cat = cat + ` лежит на печи`;
cat = `${cat} + лежит на печи`;
console.log("cat = `${cat} + лежит на печи`;");

console.log(`let cat =`, cat);

console.log(`null==undefined`, null == undefined);
console.log(`null==0`, null == 0);
console.log(`null==1`, null == 1);
console.log(`null==true`, null == true);
console.log(`null==false`, null == false);

console.log(`undefined==0`, undefined == 0);
console.log(`undefined==1`, undefined == 1);
console.log(`undefined==true`, undefined == true);
console.log(`undefined==false`, undefined == false);

console.log(`0==1`, 0 == 1);
console.log(`0==true`, 0 == true);
console.log(`0==false`, 0 == false);

console.log(`1==true`, 1 == true);
console.log(`1==false`, 1 == false);

// #endregion task0-0

// #region tsk 0-1

function checkLogin() {
  let login = document.getElementById("login");
  let password = document.getElementById("password");

  if (login.value) {
    if (password.value != "123") {
      console.log("you are not authorized");
    } else if (login.value === "admin") {
      console.log("Welcome, admin!");
    } else {
      console.log("Welcome!");
    }
    return false;
  } else {
    console.log("something went wrong");
  }
}

function checkPoints() {
  let pointValue = document.getElementById("points");
  // console.log("value", pointValue.value);

  // let pointValue = 75;

  let gradeValue;
  switch (true) {
    case pointValue.value > 90:
      gradeValue = `the value is great`;
      console.log(`the value is great`);
      break;
    case pointValue.value > 74:
      gradeValue = `the value is good`;
      console.log(`the value is good`);
      break;
    case pointValue.value >= 60:
      gradeValue = `the value is not so bad`;
      console.log(`the value is not so bad`);
    default:
      gradeValue = "you must learn";
      console.log("you must learn");
      break;
  }

  // document.getElementById("demo-form-0").innerHTML = gradeValue;
  document.querySelector("#demo-form-0").innerHTML = gradeValue;
}

// #endregion tsk 0-1

// #region task1

let a = 12;
let b = 21;

console.log(`At first: let a = `, a, `let b = `, b);

let m = b;

b = a;
a = m;

console.log(`At the end: let a = `, a, `let b = `, b);

// #endregion task1

// #region task2

function increase() {
  let a = 10;
  let b = 7;
  let c = 8;

  // The solution with array (I saww additional materal -- I saw it previously)
  const incrArr = [];

  incrArr.push(a, b, c);
  console.log(`incrArr before sort:`, incrArr);

  incrArr.sort(function (a, b) {
    return a - b;
  });

  console.log(`incrArr after sort`, incrArr);

  // ---
  // The solution with if

  let incrRec = "";

  if (a > b) {
    if (b > c) {
      incrRec = `${c} ${b} ${a}`;
    } else if (a > c) {
      incrRec = `${b} ${c} ${a}`;
    } else {
      incrRec = `${b} ${a} ${c}`;
    }
  } else {
    if (a > c) {
      incrRec = `${c} ${a} ${b}`;
    } else if (b > c) {
      incrRec = `${a} ${c} ${b}`;
    } else {
      incrRec = `${a} ${b} ${c}`;
    }
  }
  console.log(incrRec);
}

let zIncrease = increase();

// #endregion task2

// #region task3

function century() {
  let ce = 2000;

  if (ce % 100 === 0) {
    console.log(`the century is:`, ce / 100);
  } else {
    console.log(`the century is:`, (ce - (ce % 100)) / 100 + 1);
  }
}

let zCentury = century();

// #endregion task3

// #region task4

function numberEvenOddPre() {
  // let num = 3;
  let num = 552;
  let numToStr = num + "";

  console.log(`typeof num`, typeof num);
  console.log(`typeof numToStr`, typeof numToStr);
  console.log(`numToStr.length`, numToStr.length);

  let numSum = 0;
  for (let i = 0; i < numToStr.length; i++) {
    let numPart = +numToStr.slice(i, i + 1);

    numSum = numSum + numPart;

    console.log(numSum);

    // console.log(numPart, typeof numPart);
    // console.log(numToStr.slice(i, i + 1));
  }
  console.log(`numSum after loop`, numSum);

  if (numSum % 2 == 0) {
    console.log(`the number is even`);
  } else {
    console.log(`the number is odd`);
  }
}

function numberSummEvenOdd() {
  let num = 552;
  console.log(`num is:`, num);
  let numToStr = num + ""; // number to string

  let numSum = 0;

  for (let i = 0; i < numToStr.length; i++) {
    let numPart = +numToStr.slice(i, i + 1);
    numSum = numSum + numPart;
    console.log(`numSum is after ${i + 1} iteration:`, numSum);
  }
  console.log(`numSum after loop`, numSum);

  numSum % 2 == 0
    ? console.log(`the number is even`)
    : console.log(`the number is odd`);
}

let zNumberEvenOdd = numberSummEvenOdd();

// #endregion task4

// #region task5

function checkMonth() {
  let monthValue = document.getElementById("monthId");

  console.log(`monthValue.value is`, monthValue.value);

  let season;

  switch (true) {
    case (monthValue.value >= 1 && monthValue.value < 3) ||
      monthValue.value == 12:
      season = `winter`;
      console.log(`winter`);
      break;

    case monthValue.value >= 3 && monthValue.value < 6:
      season = `spring`;
      console.log(`spring`);
      break;

    case monthValue.value >= 6 && monthValue.value < 9:
      season = `summer`;
      console.log(`summer`);
      break;

    default:
      season = `autumn`;
      console.log("autumn");
      break;
  }

  document.querySelector("#demo-form-1").innerHTML = season;
}

let zSeason = checkMonth();

// #endregion task5
