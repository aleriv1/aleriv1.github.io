// todo: См строки 35, 36, 37

const игровоеПоле = document.querySelector('div[name="поле"]');
console.log(`игровоеПоле is:`, игровоеПоле);

const СЛОВА = [
  {
    слово: "Фомаа",
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
  //   мбукв = элем.слово.split("");
  let мбуквВФункцииНачатьИгру = элем.слово.split("");
  console.log(`мбуквВФункцииНачатьИгру is:`, мбуквВФункцииНачатьИгру);
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

кнопкаПроверка.addEventListener("click", (событие) => {
  let сосед = событие.target.previousElementSibling;
  console.log(`сосед is:`, сосед);
  проверкаБуквы(сосед.value);
  //   console.log(`сосед.value is:`, сосед.value);
  //   console.log(`сосед.value type is:`, typeof сосед.value);
});

// function checkNumFunc() {
//   let checkNum = true;
//   let arrNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//   arrNum.forEach((i) => {
//     if (буква === String(arrNum[i])) {
//       checkNum = false;
//     }
//   });
//   checkNum
//     ? console.log(`You entered the right symbol`)
//     : console.log(`You entered a number`);
// }

let failTryCount = 0;

function проверкаБуквы(буква) {
  // todo: Проверить что буква одна, что это не цифра, удалить пробелы при их наличии.
  // todo: Реализовать подсчет неудачных попыток и проигрыша в случае 10 попыток.
  // todo: Реализовать выдачу приза и конца игры в случае открытия всех букв.

  // #region Проверить что буква одна, что это не цифра, удалить пробелы при их наличии.

  let буквы = "";
  let stopCheck;

  function checkNumFunc() {
    console.log(`Youk entered the right amount of symbols`);
    let checkNum = true;
    let arrNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    arrNum.forEach((i) => {
      if (буквы === String(arrNum[i])) {
        checkNum = false;
        console.log(`checkNum`, checkNum);
      }
    });

    if (checkNum) {
      console.log(`checkNum`, checkNum);
      console.log(`You entered the right symbol`);
    } else {
      stopCheck = true;
      console.log(`You entered a number`);
    }

    // checkNum
    //   ? console.log(`You entered the right symbol`)
    //     console.log(`You entered the right symbol`)
    //    //   : console.log(`You entered a number`);
    //  :   (() => {
    //       console.log(`You entered a number`);
    //       stopCheck = true;
    //     })();
  }

  буква.length !== 1
    ? (() => {
        for (let i = 0; i < буква.length; i++) {
          let addedChar = буква.charAt(i) === " " ? "" : буква.charAt(i);
          буквы += addedChar;
        }

        if (буквы.length !== 1) {
          stopCheck = true;
          console.log(`please enter only one letter`);
          //   return;
        } else {
          checkNumFunc();
        }
        // буквы.length !== 1
        //   ? // ? console.log(`please enter only one letter`)
        //     (() => {
        //       console.log(`please enter only one letter`);
        //     })()
        //   : checkNumFunc();
      })()
    : checkNumFunc();

  if (stopCheck) {
    return;
  }

  // #endregion Проверить что буква одна, что это не цифра, удалить пробелы при их наличии.

  let мИндексов = [];
  let мбуквВФункцииПроверкиБуквы = СЛОВА[0].слово.split("");
  мбуквВФункцииПроверкиБуквы.forEach((element, index) => {
    // console.log(`element is:`, element);
    if (буква == element) {
      мИндексов.push(index);
    }
  });

  if (мИндексов.length != 0) {
    // console.log(`мИндексов`, мИндексов);
    мИндексов.forEach((index) => {
      let узел = document.querySelector('div[data-id="' + index + '"]');
      узел.innerHTML = буква;
    });
  }
  // #region Реализовать подсчет неудачных попыток и проигрыша в случае 10 попыток.
  else {
    failTryCount += 1;
  }
  console.log(`failTryCount is:`, failTryCount);
  //   console.log(`мИндексов`, мИндексов);
  //   console.log(`Буква is:`, буква);

  if (failTryCount > 3) {
    console.log(`you lose`);
  }

  // #endregion Реализовать подсчет неудачных попыток и проигрыша в случае 10 попыток.
}
