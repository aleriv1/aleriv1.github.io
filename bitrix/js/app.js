let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls

// const prev = document.querySelector(`.prev`);

// // prev.addEventListener(`click`, () => {
// prev.addEventListener(`click`, (e) => {
//   e.stopPropagation();
//   plusSlides(-1);
// });

// const next = document.querySelector(`.next`);

// // prev.addEventListener(`click`, () => {
// prev.addEventListener(`click`, (e) => {
//   e.stopPropagation();
//   plusSlides(1);
// });

function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

const imgPreview = document.querySelector(".img-preview");
const sldWr = document.querySelector(".slideshow-wrapper");
const body = document.querySelector("body");

sldWr.addEventListener(`click`, (e) => {
  e.stopPropagation();
});

imgPreview.addEventListener(`click`, (e) => {
  e.stopPropagation();
  sldWr.classList.toggle("none");
});

body.addEventListener(`click`, (e) => {
  e.stopPropagation();
  sldWr.classList.add("none");
});
