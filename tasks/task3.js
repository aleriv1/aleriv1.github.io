//todo: Дан номер некоторого года (положительное целое число).
// Вывести соответствующий ему номер столетия, учитывая, что,
// к примеру, началом 20 столетия был 1901 год.

// #region task #3

function century() {
  let yearCentury = 101;
  // let yearCentury = prompt(`Введите год`);
  let century;

  if (yearCentury % 100 === 0) {
    console.log(
      `the year is: ${yearCentury}; the century is:`,
      (century = yearCentury / 100)
    );
  } else {
    console.log(
      `the year is: ${yearCentury}; the century is:`,
      (century = (yearCentury - (yearCentury % 100)) / 100 + 1)
    );
  }
  // alert(`Для года ${yearCentury} номер столетия ${century}`);
  console.log(`Для года ${yearCentury} номер столетия ${century}`);
}

let zCentury = century();

// #endregion task #3
