console.log("lilya");

/* Swiper */
let swiper = Swiper;
let init = false;

/* Which media query */
function swiperMode() {
  let mobile = window.matchMedia("(min-width: 0px) and (max-width: 767px)");

  // Enable (for mobile)
  if (mobile.matches) {
    if (!init) {
      init = true;
      // swiper = new Swiper('.swiper-container', {
      swiper = new Swiper(".swiper", {
        // Optional parameters
        // direction: "vertical",
        loop: true,
        slidesPerView: 1.2,
        // slidesPerView: auto,
        spaceBetween: 20,

        // If we need pagination
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets",
          // hide: true,
        },

        // Navigation arrows
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        // And if we need scrollbar
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      });
    }
  }

  // Disable (for tablet)
  // else if (tablet.matches) {
  else {
    swiper.destroy(true, true);
    init = false;
  }
}

/* On Load */
window.addEventListener("load", function () {
  swiperMode();
});

/* On Resize */
window.addEventListener("resize", function () {
  swiperMode();
});

let expand = document.querySelector(".expand--brands");

let mySwWr = document.querySelector(".my-swiper__wrapper");

let buttonShow = true;

console.log(`expand is: ${expand} | mySwWr is: ${mySwWr}`);

expand.addEventListener("click", () => {
  if (buttonShow) {
    buttonShow = false;
    // mySwWr.style.height = "auto";
    // mySwWr.style.height = "256px";
    mySwWr.style.maxHeight = "500px";
    expand.innerHTML = "Скрыть";
  } else {
    buttonShow = true;
    // mySwWr.style.height = "184px";
    mySwWr.style.maxHeight = "184px";
    expand.innerHTML = "Показать всё";
  }
});
