const form = document.querySelectorAll(".form");
const shoppingCartShow = document.querySelector(".shopping-cart-show");

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
