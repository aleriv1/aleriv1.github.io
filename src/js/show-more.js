console.log('test show-more.js')

// #region expand action var

// let expand = document.querySelector('.expand')
let expands = document.querySelectorAll('.expand')

let mySwWr = document.querySelector('.my-swiper__wrapper')

// let buttonShow = true

// #endregion expand action var

// #region expand actions

// expand.addEventListener('click', (e) => {
// if (buttonShow) {
// buttonShow = false
//
// mySwWr.classList.toggle('my-swiper__wrapper--opened')
//
// expand.classList.toggle('expand--opened')
// expand.style.setProperty('--rotExp', 'rotate(180deg)')
// expand.innerHTML = 'Скрыть'
// } else {
// buttonShow = true
//
// mySwWr.classList.toggle('my-swiper__wrapper--opened')
//
// expand.classList.toggle('expand--opened')
// expand.style.setProperty('--rotExp', 'rotate(0)')
// expand.innerHTML = 'Показать всё'
// }
// })
//

for (let i = 0; i < expands.length; i++) {
  let buttonShow = true
  let expandSign
  let textClose
  if (expands[i].textContent.replace(/^\s+|\s+$/g, '') === 'Показать всё') {
    expandSign = 'show'
    textClose = 'Показать всё'
  } else {
    textClose = 'Читать далее'
  }
  expands[i].addEventListener('click', (e) => {
    elementToChange =
      expandSign === 'show'
        ? e.target.previousElementSibling.firstElementChild
        : e.target.previousElementSibling

    if (buttonShow) {
      buttonShow = false

      elementToChange.classList.toggle('my-swiper__wrapper--opened')
      //
      expands[i].classList.toggle('expand--opened')
      expands[i].style.setProperty('--rotExp', 'rotate(180deg)')
      console.log(expands[i].textContent.replace(/^\s+|\s+$/g, ''))
      expands[i].innerHTML = 'Скрыть'
    } else {
      buttonShow = true
      //

      elementToChange.classList.toggle('my-swiper__wrapper--opened')
      //
      expands[i].classList.toggle('expand--opened')
      expands[i].style.setProperty('--rotExp', 'rotate(0)')
      expands[i].innerHTML = textClose
    }
  })
}
// #endregion expand actions
