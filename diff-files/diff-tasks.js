function anagram(word1, word2) {
  // word1.toLowerCase().split("").sort().join("") === word2.toLowerCase().split("").sort().join("")
  console.log(
    `is '${word2}' the anagram '${word1}'? `,
    word1.toLowerCase().split("").sort().join("") ===
      word2.toLowerCase().split("").sort().join("")
  );
}

// ---

// #region // note: palindrome check

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

console.log(`forwardCheckString is: ${forwardCheckString}`);

for (let i = 0; i < checkString.length; i++) {
  let addChar =
    checkString.charAt(checkString.length - 1 - i) === " " ||
    checkString.charAt(checkString.length - 1 - i) === "."
      ? // checkString.charAt(checkString.length - i) === (" " || ".")
        ""
      : checkString.charAt(checkString.length - 1 - i);
  console.log(`addChar is: ${addChar}`);

  reverseCheckString += addChar;
}
console.log(`reverseCheckString is: ${reverseCheckString}`);

let check =
  forwardCheckString.toLowerCase() === reverseCheckString.toLowerCase()
    ? `This is a palindrom`
    : `No, this is not a palindrom`;

console.log(`${check}`);

console.log(`| leksa, |`.replace(/[\s,]/g, ""));

// ---

console.log(
  `| Leksa, |`.toLowerCase().replace(/[\s,]/g, "").split("").reverse().join("")
);

// function f_isPalindrom(palCheck = prompt("type", "leksa").replace.replace(/[\s,]/g).split("")) {
function f_isPalindrom(
  palCheck = prompt("type", "leksa").replace(/[\s,]/g, "").toLowerCase()
) {
  // let palCheck.replace(/[\s,]/g,"")
  // console.log(palCheck === palCheck.split("").reverse().join(""))
  console.log(
    palCheck === palCheck.split("").reverse().join("") ? "palindrom" : "not"
  );

  // for (let i = 0; i < palCheck.length; i++) {
  //   if (palCheck.charAt(palCheck.length - 1 - i) !== palCheck.charAt(i)) {
  //     console.log(`no a palindrom`)
  //     return
  //   }
  // }
  // console.log(`a palindrom`)
}
// f_isPalindrom()

// #endregion // note: palindrome check
