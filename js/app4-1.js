// console.log(`test`);
// let user = {
//   login: "admin@admin",
//   passwd: 123,
// };

// function checkLogin() {
//   alert("Приветсвие");
//   let login = document.querySelector('input[name="email"]');
//   let password = document.querySelector('input[name="password"]');

//   if (user.login === login.value) {
//     if (user.passwd === Number(password.value)) {
//       location.href = "./admin.html";
//     } else {
//       // password.classList.add("border-red-300");
//       password.classList.add("border-red-500");
//     }
//   } else {
//     // login.classList.add("border-red-300");
//     login.classList.add("border-red-500");
//   }
// }
// console.log(`test`);

let user = {
  login: `admin@mail.ru`,
  passw: 12345678,
  // passw: `12345678`,
};

const checkLogin = (login) => {
  console.log(`test-login`);

  if (!login) return false;
  if (login.includes("@") && login.length > 6 && user.login == login) {
    return true;
  } else {
    return false;
  }
};

const checkPassw = (passwd) => {
  console.log(`test-password`);

  // if (!passwd) return false;
  if (!String(passwd)) return false;
  // if (user.passw === passwd && passwd.length >= 8) {
  if (user.passw === passwd && String(passwd).length >= 8) {
    return true;
  } else {
    return false;
  }
};

function check() {
  console.log(`check`);
}

const checkForm = () => {
  console.log(`test-login`);
  // let login = document.querySelector(`input[name="login"]`);
  // let password = document.querySelector(`input[name="password"]`);
  console.log(`test1`);
  if (checkLogin(login.value)) {
    console.log(`test2`);
    // checkPassw(password.value) ? true : password.classList.add(`fch`);
    // : password.classList.add(`border-red-500`);
  } else {
    // login.classList.toggle(`border-red-500`);
    console.log(`test3`);
    // login.classList.toggle(`fch`);
  }
};

// console.log(`app4-1.js login false`, checkLogin(`adsf`));
// console.log(`app4-1.js login false`, checkLogin(`a@a`));
// console.log(`app4-1.js login true`, checkLogin(`admin@mail.ru`));

// console.log(`//---`);

// console.log(`app4-1.js password false`, checkPassw(`adsf`));
// console.log(`app4-1.js password false`, checkPassw(`a@a`));
// console.log(`app4-1.js password true`, checkPassw(12345678));

// console.log(`app4-1.js`);
// assert.equal(checkLogin("sd"), false);
