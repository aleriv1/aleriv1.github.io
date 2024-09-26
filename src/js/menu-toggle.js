const navLink = document.querySelector('.nav__link')
const sideMenu = document.querySelector('.side-menu')
const closeMenuBtn = document.querySelector('.layout-button--close-menu')
const blurEl = document.querySelector('.blur')

navLink.addEventListener('click', function (evt) {
  evt.preventDefault()
  blurEl.classList.add('blur-on')
  sideMenu.classList.toggle('side-menu--open')
})

closeMenuBtn.addEventListener('click', function (evt) {
  evt.preventDefault()
  sideMenu.classList.toggle('side-menu--open')
  blurEl.classList.remove('blur-on')
})

blurEl.addEventListener('click', function () {
  sideMenu.classList.remove('side-menu--open')
  blurEl.classList.remove('blur-on')
})
