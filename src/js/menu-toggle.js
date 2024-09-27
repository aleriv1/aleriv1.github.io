// #region variables

export const sideMenu = document.querySelector('.side-menu')
export let delay = 150
const navLink = document.querySelector('.nav__link')
const closeMenuBtn = document.querySelector('.layout-button--close-menu')
const blurEl = document.querySelector('.blur')
const deviceWidth = window.matchMedia('(min-width: 1440px)')

let parentMenuEl = sideMenu.parentElement
let parentStyleHeightInitial =
  getComputedStyle(parentMenuEl).getPropertyValue('height')

let parentStyleHeight =
  getComputedStyle(parentMenuEl).getPropertyValue('height')

// #endregion variables

navLink.addEventListener('click', function (evt) {
  evt.preventDefault()
  blurEl.classList.add('blur-on')
  sideMenu.classList.toggle('open-left')
})

closeMenuBtn.addEventListener('click', function (evt) {
  evt.preventDefault()
  sideMenu.classList.toggle('open-left')
  blurEl.classList.remove('blur-on')
})

blurEl.addEventListener('click', function () {
  sideMenu.classList.remove('open-left')
  blurEl.classList.remove('blur-on')
})

window.addEventListener('load', function () {
  parentStyleHeightInitial =
    getComputedStyle(parentMenuEl).getPropertyValue('height')
})

export const setHeight = () => {
  if (deviceWidth.matches) {
    sideMenu.style.height = parentStyleHeightInitial
    setTimeout(() => {
      parentStyleHeight =
        getComputedStyle(parentMenuEl).getPropertyValue('height')
      sideMenu.style.height = parentStyleHeight
    }, 1000)
  }
}

window.addEventListener('resize', setHeight)

setHeight()
