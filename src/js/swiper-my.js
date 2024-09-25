console.log('swiper-my.js')

// #region swiper var

let swiper = Swiper

let init = false

// #endregion swiper var

// #region swiper

/* media query */
function swiperMode() {
  let mobile = window.matchMedia('(min-width: 0px) and (max-width: 767px)')

  // Enable (for mobile)
  if (mobile.matches) {
    if (!init) {
      init = true
      swiper = new Swiper('.swiper', {
        loop: true,
        slidesPerView: 1.25,
        spaceBetween: 20,

        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets'
        }
      })
    }
  } else {
    swiper.destroy(true, true)
    init = false
  }
}

window.addEventListener('load', function () {
  swiperMode()
})

window.addEventListener('resize', function () {
  swiperMode()
})

// #endregion swiper
