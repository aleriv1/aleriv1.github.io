// flowbit.com/blocks/marketin

// let user = {
//   login: "admin@admin",
//   pswd: 123,
// };

// function checkLogin() {
//   // alert("submit!");
//   // document.getElementById("login");

//   // let login = document.getElementById("login");
//   let login = document.querySelector("input[name='email']");
//   // let password = document.getElementById("password");
//   let password = document.document.querySelector("input[name='password']");

//   // console.log("value", login.value);

//   if (user.loign === login.value) {
//     if (user.paswd === password) {
//       location.href = "./admin.html";
//     } else {
//       login.classList.add(`border-red-500`);
//     }
//   }

//   console.log(`login`, typeof loggin.value);
//   console.log(`password`, typeof password.vallue);

//   // if (login.value && password.value) {
//   //   // if (login.value) {
//   //   alert("form is valid");
//   // } else {
//   //   alert("`something gets wrong`");
//   // }

//   // return false;
// }

console.log(`test`);
let user = {
  login: "admin@admin",
  paswd: 123,
};

function checkLogin() {
  alert("Приветсвие");
  let login = document.querySelector('input[name="email"]');
  let password = document.querySelector('input[name="password"]');

  if (user.login === login.value) {
    if (user.paswd === Number(password.value)) {
      location.href = "./admin.html";
    } else {
      // password.classList.add("border-red-300");
      password.classList.add("border-red-500");
    }
  } else {
    // login.classList.add("border-red-300");
    login.classList.add("border-red-500");
  }
}
