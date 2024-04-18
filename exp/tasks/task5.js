// todo: Дан номер месяца (1 — январь, 2 — февраль, ...).
// Вывести название соответствующего времени года("зима", "весна" и т.д.).
// Примечание: решить задачу через конструкцию switch

// #region task5

function checkMonth() {
  // let monthValue = document.getElementById("monthId");
  let monthValue = 9;
  // let monthValue = umber(prompt(`Enter the month number`));

  let season;

  switch (true) {
    // case monthValue.value > 12 || monthValue.value < 1:
    case monthValue > 12 || monthValue < 1:
      console.log(
        `season is:`,
        (season = `...stop, there is no such a season, there are only 12 months on The Earth planet now`)
      );
      break;

    // case (monthValue.value >= 1 && monthValue.value < 3) ||
    //   monthValue.value == 12:
    case (monthValue >= 1 && monthValue < 3) || monthValue === 12:
      console.log(`season is:`, (season = `winter`));
      break;

    // case monthValue.value >= 3 && monthValue.value < 6:
    case monthValue >= 3 && monthValue < 6:
      season = `spring`;
      console.log(`season is:`, (season = `spring`));
      break;

    // case monthValue.value >= 6 && monthValue.value < 9:
    case monthValue >= 6 && monthValue < 9:
      season = `summer`;
      console.log(`season is:`, (season = `summer`));
      break;

    default:
      season = `autumn`;
      console.log(`season is:`, (season = `autumn`));
      break;
  }

  // document.querySelector("#demo-form-1").innerHTML = season;
  console.log(`for month number ${monthValue} the season is ${season}`);
  // alert(`for month number ${monthValue} the season is ${season}`);
}

let zSeason = checkMonth();

// #endregion task5
