//todo: Задан произвольный url необходимо получить router, action и id

Пример: var url = "http://www.ozon.ru/context/detail/id/19677670/";
// router: context
// action: detail
// id: 19677670

// #region task 11 // функция из предыдущего задания универсальна, подходит и в данном; корявое решение минус

console.log(`\n task 11, solution #2 \n\n`);

function partStringFunc(
  string = "http://www.ozon.ru/context/detail/id/19677670/",
  partStart = 1,
  partFinish = 2,
  partStringName = "domain"
) {
  let url = string;
  // url = "http://www.ozon.ru/context/detail/id/19677670/";
  let slashArr = [];
  for (let i = 0; i < url.length; i++) {
    if (url.charAt(i) === "/") {
      slashArr.push(i);
    }
  }

  // console.log(slashArr);
  let partSting = url.substring(slashArr[partStart] + 1, slashArr[partFinish]);
  console.log(`${partStringName} is: ${partSting}`);
}

partStringFunc(undefined, 2, 3, `router`);
partStringFunc(undefined, 3, 4, `action`);
partStringFunc(undefined, 5, 6, `id`);

// #endregion task 11
