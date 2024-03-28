// #region diff tasks
//
// #region #i> Leksa

// #region // note: palindrome check
/* 
let checkString = prompt(`Is it Palindrom?`);
let forwardCheckString = "";
let reverseCheckString = "";

checkString === null
  ? console.log(`no`)
  : // : (function () {
  (() => {
    for (let i = 0; i < checkString.length; i++) {
      // let addedChar = checkString.charAt(i) === " "  ? "" : checkString.charAt(i);
      let addedChar =
        checkString.charAt(i) === " " || checkString.charAt(i) === "."
          ? ""
          : checkString.charAt(i);

      forwardCheckString += addedChar.toLowerCase();

      i === checkString.length - 1
        ? console.log(forwardCheckString)
        : console.log();
    }

    for (let i = 0; i < forwardCheckString.length; i++) {
      reverseCheckString += forwardCheckString.charAt(
        forwardCheckString.length - 1 - i
      );
      if (
        forwardCheckString.charAt(forwardCheckString.length - 1 - i) !==
        forwardCheckString.charAt(i)
      ) {
        console.log(`reverseCheckString stopped at ${reverseCheckString}`);
        console.log(`!!!No, this is not a palindrom`);
        break;
      } else {
        if (i === forwardCheckString.length - 1) {
          console.log(`Yes, this a palindrom`);
        }
      }
    }
  })();


// console.log(`forwardCheckString is: ${forwardCheckString}`);

// for (let i = 0; i < checkString.length; i++) {
//   let addChar =
//     checkString.charAt(checkString.length - 1 - i) === " " ||
//     checkString.charAt(checkString.length - 1 - i) === "."
//       ? // checkString.charAt(checkString.length - i) === (" " || ".")
//         ""
//       : checkString.charAt(checkString.length - 1 - i);
//   console.log(`addChar is: ${addChar}`);

//   reverseCheckString += addChar;
// }
// console.log(`reverseCheckString is: ${reverseCheckString}`);

// let check =
//   forwardCheckString.toLowerCase() === reverseCheckString.toLowerCase()
//     ? `This is a palindrom`
//     : `No, this is not a palindrom`;

// console.log(`${check}`);

// console.log(`| leksa, |`.replace(/[\s,]/g, ""))
console.log(`| Leksa, |`.toLowerCase().replace(/[\s,]/g, "").split("").reverse().join(""))


// function f_isPalindrom(palCheck = prompt("type", "leksa").replace.replace(/[\s,]/g).split("")) {
function f_isPalindrom(palCheck = prompt("type", "leksa").replace(/[\s,]/g, "").toLowerCase()) {
  // let palCheck.replace(/[\s,]/g,"")
  // console.log(palCheck === palCheck.split("").reverse().join(""))
  console.log(palCheck === palCheck.split("").reverse().join("") ? "palindrom" : "not")

  // for (let i = 0; i < palCheck.length; i++) {
  //   if (palCheck.charAt(palCheck.length - 1 - i) !== palCheck.charAt(i)) {
  //     console.log(`no a palindrom`)
  //     return
  //   }
  // }
  // console.log(`a palindrom`)
}
// f_isPalindrom()

*/
// #endregion // note: palindrome check

// #region // note: crows
/* 
// console.log(12 % 10);
// console.log(2 % 10);
// console.log(10 % 100);

// let crowsCount = 1014;
let numberOfCrows = prompt("How many crows sat on the branch?");
let end;

// (crowsCount-crowsCount%10)%100

if (numberOfCrows % 10 === 1) {
  end = "а";
} else if (
  numberOfCrows % 10 > 1 &&
  numberOfCrows % 10 < 5 &&
  // (crowsCount - (crowsCount % 10)) % 100 != 10
  !((numberOfCrows - (numberOfCrows % 10)) % 100 === 10)
) {
  end = "ы";
} else end = "";

console.log(
  `На ветке сидело ${numberOfCrows} ворон${end}`
  // `
  // !((crowsCount - (crowsCount % 10)) % 100 == 10`,
  // !((crowsCount - (crowsCount % 10)) % 100 == 10)
);


// console.log("На ветке сидело " + crowsCount + " ворон" + end);
*/
// #endregion // note: crows

// #region // note: a to the power b
/* 
// let a = "",
//   b = "";
// function powerSimple(a, b) {
function powerSimple(a = prompt("a"), b = prompt("b")) {
  let x;
  if (+b === 0) {
    x = 1;
    // a = 1;
  } else {
    x = a;
    for (let y = 1; y < b; y++) {
      x *= a;
      // a *= a;
    }
  }
  console.log(x);
  // console.log(a); // ^imp: 2*2->4*4
  return "a to the power of b";
}
powerSimple(2, 5);
powerSimple(3, 2);
console.log(powerSimple(2, 1)); */
// #endregion // note: a to the power b

// #region // note: mutliply table
/* 
const divCre = document.createElement("div");
divCre.classList.add("mult-table");
document.querySelector("body").appendChild(divCre);
document.querySelector(".mult-table").innerHTML = "leksa" + mult_table();
// document.querySelector(".mult-table").innerHTML = "leksa" + test_ins();

function mult_table() {
  let table = "<table>";
  // table += "<tr>";

  for (let i = 1; i <= 10; i++) {
    // if (i === 1 || i === 6) {
    //   table += "<tr>";
    // }
    // table += "<td>";

    table += "<tr>";
    // console.log(i);
    for (let j = 1; j <= 10; j++) {
      table += "<td>" + i * j + "</td>";
      // table += "<td>" + i + " * " + j + " = " + i * j + "</td>";
      // table += i + " * " + j + " = " + i * j + "<br>";
      // console.log(i * j);
    }
    table += "</tr>";

    // table += "</td>";
    // if (i === 5 || i === 5) {
    //   table += "</tr>";
    // }
  }

  // table += "</tr>";
  table += "</table>";

  return table;
}
*/
// #endregion // note: mutliply tabler

// #region //note: star triangle
/* 
let whole_line = "";
let space_line = "";
let star_line = "*";
let number_line = 3;

// for (let i = 0; i < 3; i++) {
for (let i = 0; i <= number_line; i++) {
  // for (let j = 2 - i; j > 0; j--) {
  for (let j = number_line - i; j > 0; j--) {
    space_line += " ";
  }
  // for (let k = 0; k < i; k++) {
  //   star_line += "**";
  // }
  console.log(space_line + star_line);
  star_line += "**";
  // star_line = "*";
  space_line = "";
}

star_line = "*";
// for (let i = 0; i < 3; i++) {
for (let i = 0; i <= number_line; i++) {
  for (let j = 0; j < i; j++) {
    space_line += " ";
  }
  // for (let k = 2 - i; k > 0; k--) {
  for (let k = number_line - 1 - i; k >= 0; k--) {
    star_line += "**";
  }
  console.log(space_line + star_line);
  // star_line += "**";
  star_line = "*";
  space_line = "";
}

let i = number_line;
while (number_line >= 0) {
  while (i > 0) {
    space_line += " ";
    // console.log("!");
    i--;
  }
  // console.log(star_line);
  console.log(space_line + star_line);
  star_line += "**";
  space_line = "";
  number_line--;
  i = number_line;
}

{
  let i = 0;
  let j = 2;
  star_line = "*";
  space_line = "";

  while (i < 3) {
    while (j - i > 0) {
      space_line += " ";
      // console.log("!");
      j--;
    }
    // console.log(star_line);
    console.log(space_line + star_line);
    star_line += "**";
    j = 2;
    space_line = "";
    i++;
  }
} */
// #endregion //note: star triangle

// #region //note: cars
/* let cars = {
  "УАЗ 469": {
    country: "Russia",
    color: "darkolivegreen",
    year: 1972,
  },

  "УАЗ Хантер": {
    country: "Russia",
    color: "darksteelgray",
    year: 2010,
  },

  "УАЗ Патриот": {
    country: "Russia",
    color: "darkcyan",
    year: 2016,
  },

  "УАЗ Патриот Life Style": {
    country: "Russia",
    color: "green",
    year: 2019,
  },

  "УАЗ Пикап": {
    country: "Russia",
    color: "black",
    year: 2018,
  },

  "Ferrari 166 MM Barchetta": {
    country: "Italy",
    color: "silver",
    year: 1948,
  },

  "Ferrari Portofion": {
    country: "Italy",
    color: "yellow",
    year: 2018,
  },

  "Ferrari 812 superfast": {
    country: "Italy",
    color: "red",
    year: 2012,
  },

  "Ferrari Enzo Ferrari": {
    country: "Italy",
    color: "white",
    year: 2002,
  },

  "Ferrari SF90": {
    country: "Italy",
    color: "red",
    year: 2019,
  },
};

let years = [];

let i = 0;

for (const x in cars) {
  // years += `${cars[x].year},`;
  years[i] = cars[x].year;
  i++;
}

console.log(years);
// console.log(
//   ()=> (

//   )()

// )

function arrSort(arr) {
  arr.sort((a, b) => {
    return a - b;
  });
  return arr;
}
// const table = document.createElement("table");

let innerTable = "";

// document.querySelector("body").appendChild(document.createElement("table"))
document
  .querySelector("body")
  .appendChild(document.createElement("table")).innerHTML = (() => {
  arrSort(years);
  for (let i = 0; i < 3; i++) {
    // innerTable += `<tr><td>${years[i]}<td><tr>`;
    innerTable += `<tr><td>${years[i]}<td><tr>`;
  }
  return innerTable;
})();
// document.querySelector("body").appendChild(table);

// document.appendChild;

// for (let i = 0; i < 3; i++) {}

console.log(arrSort(years));

function maxArrValue(arr) {
  let len = arr.length;
  let max = -Infinity;

  while (len--) {
    if (arr[len] > max) {
      max = arr[len];
    }
  }
  return max;
}

function minArrValue(arr) {
  let len = arr.length;
  let min = Infinity;

  while (len--) {
    if (arr[len] < min) {
      min = arr[len];
    }
  }
  return min;
}

console.log(maxArrValue(years));
console.log(minArrValue(years)); */
// #endregion //note: cars

// #endregion #i> LeKsa

// #region #i> from lavvjs

// Nulish coalescing
{
  /*
  // let a = null;
  // let a = "Aleksandra";
  let a = 0;
  // console.log(a * 100);
  console.log(a ?? "Leksa");
  // console.log(a || "Leksa");
  */
}

// Loops: while and for
{
  /*
  let i = 3;
  do {
    i++;
    console.log(i);
  } while (i < 3);
  */
  // let sum = 0;
  // while (true) {
  //   let value = +prompt("Enter a number", "");
  //   if (!value) break;
  //   sum += value;
  // }
  // console.log(`sum: `, sum);
  // alert(`sum is: ${sum}`);
  /*
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) continue;
    console.log(`The odd numbers are: `, i);
  }
  */
  /*
  let coor = "";
  outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let input = +prompt(`Value at coords (${i},${j})`, "");
      // coor += i + '.' j + ": " + input + ", ";
      coor += i + "." + j + ": " + input + "; ";
      if (!input) break outer;
    }
  }
  console.log(`coor is:`, coor);
  console.log(`Done!`);
  */
  // 1,2,3,4
  // 1,2,3,4,5
  // {
  //   let i = 0;
  //   while (i++ < 5) console.log(i);
  // }
  // 0, 1, 3, 4;
  // 0, 1, 3, 4;
  //
  // for (let i = 2; i <= 10; i++) {
  //   if (i % 2 !== 0) continue;
  //   console.log(i);
  // }
  //
  /*
  for (let i = 0; i < 3; i++) {
    // alert(`number ${i}!`);
    console.log(`!number ${i}!`);
  }
 
  let i = 0;
  while (i < 3) {
    console.log(`number ${i}`);
    i++;
  }
  
  */
  /*
  while (true) {
    let number = prompt("number", "");
    if (number > 100 || +number === 0) break;
  }
 
  let num;
 
do {
  num = prompt("Enter a number greater than 100?", 0);
} while (num <= 100 && num);
  */
  /*
  let n = 22;
  outer: for (let i = 2; i <= n; i++) {
    for (let j = 2; j < i; j++) {
      if (i % j === 0) continue outer;
    }
    console.log(i, `is prime number`);
  }
  */
}

// function makeArmy() {
//   let shooters = [];

//   let i = 0;
//   while (i < 10) {
//     let k = i; // ^imp: for lexical environment
//     let shooter = function () { // функция shooter
//       // alert(i); // должна выводить порядковый номер
//       // console.log(i); // должна выводить порядковый номер
//       console.log(k); // должна выводить порядковый номер
//     };
//     shooters.push(shooter);
//     i++;
//   }

//   return shooters;
// }

// let army = makeArmy();

// army[0](); // у 0-го стрелка будет номер 10
// army[5](); // и у 5-го стрелка тоже будет номер 10
// // ... у всех стрелков будет номер 10, вместо 0, 1, 2, 3...

// #endregion #n> from ljs

// #region #i> tproger
/*
function fixxBuzz(n) {
  for (let i = 1; i <= n; i++) {
    i % 3 === 0 && i % 5 === 0
      ? console.log(`fizzBuzz`)
      : i % 3 === 0
        ? console.log(`fizz`)
        : i % 5 === 0
          ? console.log(`buzz`)
          : console.log(i);
  }
}

// fixxBuzz(5)
fixxBuzz(15);

function anagram(word1, word2) {
  // word1.toLowerCase().split("").sort().join("") === word2.toLowerCase().split("").sort().join("")
  console.log(`is '${word2}' the anagram '${word1}'? `, word1.toLowerCase().split("").sort().join("") === word2.toLowerCase().split("").sort().join(""));

}

anagram(`leksa`, `eLksa`)
anagram(`leksa`, `ekksa`)

anagram(`finder`, `Friend`)
anagram(`finder`, `Friiend`)

const body = ['hips', 90, 'waist', 60, 'breast', 90]
let weight = ['wight', 60, 65]
const leksa = [...body, ...weight]
console.log(leksa)
// console.log(
//   (() => {
//     const leksa = [...body]
//     return leksa
//   })()
// )

 */
// #endregion #n>tproger
//
// #endregion diff tasks
