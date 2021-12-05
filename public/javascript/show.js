window.onload = function () {
  const count = document.getElementById("count");
  const inc = document.getElementById("inc");
  const dec = document.getElementById("dec");
  inc.onclick = function () {
    count.value = parseInt(count.value) + 1;
  };
  dec.onclick = function () {
    if (count.value <= 0) return;
    count.value = parseInt(count.value) - 1;
  };
};

window.onload = function () {
  const slides = document.querySelectorAll(".slide-random");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  let curSlide = 0;
  let maxSlide = 6;
  const nextSlide = function () {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${20 * (i - curSlide)}%)`;
    });
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${20 * (i - curSlide)}%)`;
    });
  };

  btnLeft.addEventListener("click", nextSlide);
  btnRight.addEventListener("click", prevSlide);
};
