//todo: Задан произвольный url необходимо получить router, action и id

Пример: var url = "http://www.ozon.ru/context/detail/id/19677670/";
// router: context
// action: detail
// id: 19677670

// #region task 11 solution 1, коряво (очень)
console.log(`\n task 11, solution #1 \n\n`);

// console.log(url);

let cutPre = url.substring(url.indexOf("w"));
// console.log(`cutPre is:`, cutPre);

let routerPre = cutPre.substring(cutPre.indexOf(`/`) + 1);
// console.log(`routerPre`, routerPre);

let router = routerPre.substring(0, routerPre.indexOf("/"));
console.log(`router is:`, router);

let actionPre = routerPre.substring(routerPre.indexOf(`/`) + 1);
// console.log(`actionPre`, actionPre);

let action = actionPre.substring(0, actionPre.indexOf("/"));
console.log(`action is:`, action);

let idPre = actionPre.substring(actionPre.indexOf(`/`) + 1);
// console.log(`idPre`, idPre);

let id = idPre.substring(idPre.indexOf(`/`) + 1).slice(0, -1);
console.log(`id is:`, id);

// #endregion task 11 solution 1

console.log(`---`);

// #region task 11 solution 2
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

// #endregion task 11 solution 1
