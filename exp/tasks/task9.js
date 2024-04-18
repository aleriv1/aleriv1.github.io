//todo: Определить, является ли строка полиндромом. Палиндром - это число или слова, читающиеся одинаково в обоих направлениях.

console.log(`test`);

("потоп");
("мадам");
("комок");

("Уж истово вот сижу");

37573 - true;
23442 - false;

// когда-то я делал такую проверку

// #region task9

function palCheck(palCheckString) {
  let checkString = palCheckString;

  console.log(
    `Строка для проверки на палиндром:`,
    // (checkString = String(palCheckString))
    String(palCheckString)
  );

  let forwardCheckString = "";
  let reverseCheckString = "";

  for (let i = 0; i < checkString.length; i++) {
    // console.log(checkString.charAt(i));

    let addedChar =
      checkString.charAt(i) === " " || checkString.charAt(i) === "."
        ? ""
        : checkString.charAt(i);

    forwardCheckString += addedChar.toLowerCase();

    // console.log(forwardCheckString);
  }

  // работаем с послученной строкой в нижнем регистре с вырезанными пробелами и точками

  for (let i = 0; i < forwardCheckString.length; i++) {
    reverseCheckString += forwardCheckString.charAt(
      forwardCheckString.length - 1 - i
    );

    if (
      forwardCheckString.charAt(forwardCheckString.length - 1 - i) !==
      forwardCheckString.charAt(i)
    ) {
      console.log(`Это не палиндром`);
      break;
    } else {
      if (i == forwardCheckString.length - 1) {
        console.log(`Это палиндром`);
      }
    }
  }
}

let zPalCheck = palCheck(`Уж истово вот сижу`);

// #endregion task9
