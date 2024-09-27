// #region variables

const navLink = document.querySelector('.nav__link')
export const sideMenu = document.querySelector('.side-menu')
const closeMenuBtn = document.querySelector('.layout-button--close-menu')
const blurEl = document.querySelector('.blur')

let parentMenuEl = sideMenu.parentElement
let parentStyleHeightInitial =
  getComputedStyle(parentMenuEl).getPropertyValue('height')

let parentStyleHeight =
  getComputedStyle(parentMenuEl).getPropertyValue('height')

const deviceWidth = window.matchMedia('(min-width: 1440px)')

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
