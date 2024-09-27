// #region variables

import { sideMenu, delay } from './menu-toggle'

const feedbackBtn = document.querySelectorAll('.layout-button--feedback')
const feedbackModal = document.querySelector('.modal--feedback')
const blurEl = document.querySelector('.blur')
const closeFeedbackBtn = document.querySelector(
  '.layout-button--close-feedback'
)

// #endregion variables

for (let i = 0; i < feedbackBtn.length; i++) {
  feedbackBtn[i].addEventListener('click', () => {
    blurEl.classList.add('blur-on')
    feedbackModal.classList.add('show-el')
    setTimeout(() => {
      feedbackModal.classList.add('open-right')
    }, delay)
  })
}

closeFeedbackBtn.addEventListener('click', () => {
  feedbackModal.classList.remove('open-right')
  blurEl.classList.remove('blur-on')
  sideMenu.classList.remove('open-left')
  setTimeout(() => {
    feedbackModal.classList.remove('show-el')
  }, delay)
})

blurEl.addEventListener('click', () => {
  feedbackModal.classList.remove('open-right')
  blurEl.classList.remove('blur-on')
  setTimeout(() => {
    feedbackModal.classList.remove('show-el')
  }, delay)
})
