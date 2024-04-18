//todo:  Задан произвольный url необходимо получить его домен.

// Пеример:
var url = "http://www.ozon.ru/context/detail/id/19677670/";
// Домен: www.ozon.ru;

// #region task10, solution 1 // коряво

console.log(`url is:`, url);

let domainPre = url.substring(url.indexOf("w"));
// console.log(`domainPre is:`, domainPre);

let domain = domainPre.substring(0, domainPre.indexOf("/"));

console.log(`domain is:`, domain);

// #endregion task10, solution 1

console.log(`---`);

// #region task10, solution 2 .// лучше

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

partStringFunc();

// #endregion task10, solution 2
