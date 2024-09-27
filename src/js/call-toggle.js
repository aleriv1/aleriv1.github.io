// #region variables

import { sideMenu } from './menu-toggle'

const callBtn = document.querySelectorAll('.layout-button--call')
const callModal = document.querySelector('.modal--call')
const blurEl = document.querySelector('.blur')
const closeCallBtn = document.querySelector('.layout-button--close-call')

// #endregion variables

for (let i = 0; i < callBtn.length; i++) {
  callBtn[i].addEventListener('click', () => {
    blurEl.classList.add('blur-on')
    callModal.classList.add('open-right')
  })
}

closeCallBtn.addEventListener('click', () => {
  callModal.classList.remove('open-right')
  blurEl.classList.remove('blur-on')
  sideMenu.classList.remove('open-left')
})

blurEl.addEventListener('click', () => {
  callModal.classList.remove('open-right')
  blurEl.classList.remove('blur-on')
})
