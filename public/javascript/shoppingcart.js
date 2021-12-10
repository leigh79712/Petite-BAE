const form = document.querySelectorAll(".form");
const shoppingCartShow = document.querySelector(".shopping-cart-show");
const showImg = document.querySelectorAll(".img-hover");

const seeDetail = function () {
  showDetail.classList.toggle("hidden");
};
const saveData = async (e) => {
  const formData = new FormData(e.target);
  let en = {};
  formData.forEach((el, key) => {
    en[key] = el;
  });

  await fetch(`${e.target.action}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(en),
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

form.forEach((el) => {
  el.addEventListener("submit", function (e) {
    saveData(e);
    e.preventDefault();
  });
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
