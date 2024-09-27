import { setHeight, parentElementHeightInitial } from './menu-toggle'

// #region expand action var

let expands = document.querySelectorAll('.expand')

let mySwWr = document.querySelector('.my-swiper__wrapper')

// #endregion expand action var

// #region expand actions

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
    let elementToChange =
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
      setTimeout(setHeight, 700)
    } else {
      buttonShow = true
      //

      elementToChange.classList.toggle('my-swiper__wrapper--opened')
      //
      expands[i].classList.toggle('expand--opened')
      expands[i].style.setProperty('--rotExp', 'rotate(0)')
      expands[i].innerHTML = textClose
      setTimeout(setHeight, 700)
    }
  })
}
// #endregion expand actions
