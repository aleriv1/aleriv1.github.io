// todo: Задана форма пользовательского профиля.
// Поля: Имя, фамилия, возраст, образование, биография.
// Релизовать логику сохранения формы через sessionStorage.
// При перезагрузки страницы, данные введенные пользователем
// должны сохраняться. При нажатии на кнопку очистить, форма
// очищается.

const inputCollection = document.getElementsByClassName(`input`);

// console.log(`inputCollection is:`, inputCollection);

// #region add elements to sessionStorage when change input

Array.from(inputCollection).forEach((element) => {
  element.addEventListener(`change`, (evt) => {
    window.sessionStorage.setItem(evt.target.name, evt.target.value);
  });
});

// #endregion add elements to sessionStorage when change input

// #region values from sessionStorage  to form fields

for (let i = 0; i < window.sessionStorage.length; i++) {
  const key = window.sessionStorage.key(i);
  const input = document.querySelector(`[name=${key}]`);
  if (!input) {
    continue;
  }
  input.value = window.sessionStorage.getItem(key);
}

// #endregion values from sessionStorage  to form fields

// #region clear sessionStorage and reset filed forms

document.querySelector(`.btnClear`).addEventListener(`click`, () => {
  window.sessionStorage.clear();
  document.querySelector(`.form`).reset();
});

// #endregion clear sessionStorage and reset filed forms
