console.log("lilya");

// #region variables

// #region swiper var

let swiper = Swiper;

let init = false;

// #endregion swiper var

// #region expand action var

let expand = document.querySelector(".expand");

let mySwWr = document.querySelector(".my-swiper__wrapper");

let buttonShow = true;

// #endregion expand action var

// #endregion variables

// #region swiper

/* media query */
function swiperMode() {
  let mobile = window.matchMedia("(min-width: 0px) and (max-width: 767px)");

  // Enable (for mobile)
  if (mobile.matches) {
    if (!init) {
      init = true;
      swiper = new Swiper(".swiper", {
        loop: true,
        slidesPerView: 1.25,
        spaceBetween: 20,

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          type: "bullets",
        },
      });
    }
  } else {
    swiper.destroy(true, true);
    init = false;
  }
}

window.addEventListener("load", function () {
  swiperMode();
});

window.addEventListener("resize", function () {
  swiperMode();
});

// #endregion swiper

// #region expand actions

expand.addEventListener("click", () => {
  if (buttonShow) {
    buttonShow = false;

    mySwWr.classList.toggle("my-swiper__wrapper--opened");

    expand.classList.toggle("expand--opened");
    expand.style.setProperty("--rotExp", "rotate(180deg)");
    expand.innerHTML = "Скрыть";
  } else {
    buttonShow = true;

    mySwWr.classList.toggle("my-swiper__wrapper--opened");

    expand.classList.toggle("expand--opened");
    expand.style.setProperty("--rotExp", "rotate(0)");
    expand.innerHTML = "Показать всё";
  }
});

// #endregion expand actions
