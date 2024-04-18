// Слово для простоты -- ли
// Количество попыток -- 3

// todo: См строки 35, 36, 37

const игровоеПоле = document.querySelector('div[name="поле"]');
console.log(`игровоеПоле is:`, игровоеПоле);

const СЛОВА = [
  {
    слово: "ли",
    описание: "Контекст выполнения",
  },
];

let кнопкаГО = document.querySelector('button[name="go"]');
let кнопкаПроверка = document.querySelector('button[name="проверить"]');

кнопкаГО.addEventListener("click", (событие) => {
  событие.target.style.visibility = "hidden";
  начатьИгру();
});

function начатьИгру() {
  let элем = СЛОВА[0];
  let мбуквВФункцииНачатьИгру = элем.слово.split("");
  // console.log(`мбуквВФункцииНачатьИгру is:`, мбуквВФункцииНачатьИгру);
  alert(`У вас 3 попытки`);
  мбуквВФункцииНачатьИгру.forEach((element, index) => {
    создатьПоле(index);
  });
}

// фабрика
function создатьПоле(индекс) {
  let поле = document.createElement("div");
  поле.setAttribute("data-id", индекс);
  поле.classList.add("field");
  игровоеПоле.appendChild(поле);
}
let сосед;
кнопкаПроверка.addEventListener("click", (событие) => {
  сосед = событие.target.previousElementSibling;
  console.log(`сосед is:`, сосед);
  проверкаБуквы(сосед.value);
  сосед.value = "";
});

let failTryCount = 0;

let arrWin = [];

let arrUsedLetter = [];

function проверкаБуквы(буква) {
  // todo: Проверить что буква одна, что это не цифра, удалить пробелы при их наличии.
  // todo: Реализовать подсчет неудачных попыток и проигрыша в случае 10 попыток.
  // todo: Реализовать выдачу приза и конца игры в случае открытия всех букв.

  // #region todo: Проверить что буква одна, что это не цифра, удалить пробелы при их наличии.

  let буквы = "";

  let stopCheck;

  let checkNum = true;

  function checkNumFunc(checkSymb) {
    console.log(`Youk entered the right amount of symbols`);
    let arrNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    arrNum.forEach((i) => {
      // console.log(
      //   `checkSymb is: "${checkSymb}"`,
      //   `String(arrNum[${i}] is: "${String(arrNum[i])}"`
      // );
      if (checkSymb === String(arrNum[i])) {
        checkNum = false;
      }
    });

    checkNum
      ? console.log(`You entered the right symbol"`)
      : (() => {
          console.log(`You entered a number or space`);
          alert(`Вы ввели число. Пожалуйста, введите букву`);
          stopCheck = true;
        })();
  }

  console.log(`буква.length is:`, буква.length);

  // let letter = буква

  // #region remove space, one letter check, no space scheck

  буква.length !== 1
    ? (() => {
        for (let i = 0; i < буква.length; i++) {
          let addedChar = буква.charAt(i) === " " ? "" : буква.charAt(i);
          буквы += addedChar;
        }
        буква = буквы;

        if (буква.length !== 1) {
          stopCheck = true;
          console.log(`please enter only one letter, not space`);
          alert(`Введите только одну букву.`);
        } else {
          checkNumFunc(буква);
        }
      })()
    : (() => {
        console.log(`буква.charAt()`, буква.charAt());
        буква.charAt(0) === " "
          ? (() => {
              console.log(`Enter the letter, not the space`);
              alert(`Введите букву, не пробел`);
              stopCheck = true;
            })()
          : checkNumFunc(буква);
      })();

  // #endregion remove space, one letter check, no space scheck

  if (stopCheck) {
    return;
  }

  // #endregion todo: Проверить что буква одна, что это не цифра, удалить пробелы при их наличии.

  let мИндексов = [];
  let мбуквВФункцииПроверкиБуквы = СЛОВА[0].слово.split("");

  мбуквВФункцииПроверкиБуквы.forEach((element, index) => {
    if (буква.toLowerCase() == element.toLowerCase()) {
      мИндексов.push(index);

      // #region

      // let arrUsedLetter = [];
      // arrUsedLetter.push(буква);

      // console.log(`arrUsedLetter is:`, arrUsedLetter);
      // console.log(`arrUsedLetter.length is:`, arrUsedLetter.length);

      // for (let i = 0; i < arrUsedLetter.length; i++) {
      //   // if (arrUsedLetter[i].toLowerCase() !== element.toLowerCase()) {
      //   if (arrUsedLetter[i].toLowerCase() !== сосед.value.toLowerCase()) {
      //     console.log(
      //       `${i} arrUsedLetter[i].toLowerCase() is:`,
      //       arrUsedLetter[i].toLowerCase()
      //     );
      //     console.log(
      //       `сосед.value.toLowerCase() is:`,
      //       сосед.value.toLowerCase()
      //     );
      //     // console.log(`element.toLowerCase() is:`, element.toLowerCase());
      //     console.log(
      //       // `arrUsedLetter[i].toLowerCase() !== element.toLowerCase() is:`,
      //       `arrUsedLetter[i].toLowerCase() !== сосед.value.toLowerCase() is:`,
      //       // arrUsedLetter[i].toLowerCase() !== element.toLowerCase()
      //       arrUsedLetter[i].toLowerCase() !== сосед.value.toLowerCase()
      //     );

      //     arrWin.push(index);
      //   }
      // }

      // #endregion

      arrWin.push(index);
      console.log(`arrWin is:`, arrWin);
    }
  });

  if (мИндексов.length != 0) {
    мИндексов.forEach((index) => {
      let узел = document.querySelector('div[data-id="' + index + '"]');
      узел.innerHTML = буква.toUpperCase();
      console.log(
        `arrWin.length is:`,
        arrWin.length,
        `мбуквВФункцииПроверкиБуквы.length is:`,
        мбуквВФункцииПроверкиБуквы.length
      );
      if (arrWin.length == мбуквВФункцииПроверкиБуквы.length) {
        console.log(`You won!`);
        document.querySelector(
          `.main`
        ).innerHTML = `Вы выиграли! <br> Ваш приз - величайший респект, можете забрать его!`;
        return;
      }
    });
  }

  // #region checkWin

  // #endregion checkWin

  // #region Реализовать подсчет неудачных попыток и проигрыша в случае 3 попыток.
  else {
    failTryCount += 1;

    let edning =
      3 - failTryCount === 1 ? `ка` : 3 - failTryCount === 0 ? `ок` : `ки`;

    alert(`Неправильно! \n У вас осталось ${3 - failTryCount} попыт${edning}`);
  }

  console.log(`failTryCount is:`, failTryCount);

  if (failTryCount > 2) {
    console.log(`You lose`);
    document.querySelector(
      `.main`
    ).innerHTML = `Вы проиграли!<br>Перегрузите страницу и попробуйте снова.`;
  }

  // #endregion Реализовать подсчет неудачных попыток и проигрыша в случае 3 попыток.
}
