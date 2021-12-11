const form = document.querySelectorAll(".form");
const showImg = document.querySelectorAll(".card");
const count = document.querySelectorAll(".count");
const edit = document.querySelectorAll(".edit");
// const seeDetail = function () {
//   showDetail.classList.toggle("hidden");
// };
// const saveData = async (e) => {
//   const formData = new FormData(e.target);
//   let en = {};
//   formData.forEach((el, key) => {
//     en[key] = el;
//   });

//   await fetch(`${e.target.action}`, {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify(en),
//   })
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));
// };

// form.forEach((el) => {
//   el.addEventListener("submit", function (e) {
//     saveData(e);
//     e.preventDefault();
//   });
// });
edit.forEach((el) => {
  console.log(el);
  const count = el.parentElement.querySelector(".count");
  console.log(count);
});

showImg.forEach((el) => {
  const showDetail = el.querySelector(".show-detail");
  el.addEventListener("mouseenter", function () {
    showDetail.classList.toggle("hidden");
  });
  el.addEventListener("mouseleave", function () {
    showDetail.classList.toggle("hidden");
  });
});

window.onload = function () {
  const inc = document.querySelectorAll(".inc");
  const dec = document.querySelectorAll(".dec");
  inc.forEach((el) => {
    const count = el.nextElementSibling;
    el.addEventListener("click", function () {
      count.value = parseInt(count.value) + 1;
    });
  });
  dec.forEach((el) => {
    const count = el.previousElementSibling;
    el.addEventListener("click", function () {
      if (count.value <= 0) return;
      count.value = parseInt(count.value) - 1;
    });
  });
};
