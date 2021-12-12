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
const showImg = document.querySelectorAll(".card");

showImg.forEach((el) => {
  const showDetail = el.querySelector(".show-detail");
  el.addEventListener("mouseenter", function () {
    showDetail.classList.toggle("hidden");
  });
  el.addEventListener("mouseleave", function () {
    showDetail.classList.toggle("hidden");
  });
});

const deleteShoppingCart = (e) => {};

window.onload = function () {
  const inc = document.querySelectorAll(".inc");
  const dec = document.querySelectorAll(".dec");
  const form = document.querySelectorAll(".shoppingCart-form");

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
  form.forEach((el) => {
    const count = el.querySelector(".count");
    const deleteForm = el.closest(".card");
    if (count.value == 0) {
      let response = fetch(`${el.dataset.action}`, {
        method: "POST",
        body: {},
      });
      deleteForm.remove();
    }
  });
};
