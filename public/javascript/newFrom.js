const otherS = [];
const otherC = [];
const otherCate = [];
const otherSize = document.getElementById("otherSizeForm");
const otherColor = document.getElementById("otherColorForm");
const otherCategory = document.getElementById("otherCategoryForm");

const sizeContainer = document.querySelectorAll(".size");
const colorContainer = document.querySelectorAll(".color");
const categoryContainer = document.querySelectorAll(".category");

const sizeInput = document.querySelector(".size-input");
const colorInput = document.querySelector(".color-input");
const categoryInput = document.querySelector(".category-input");

const sizeModal = document.querySelector(".size-modal");
const colorModal = document.querySelector(".color-modal");
const categoryModal = document.querySelector(".category-modal");

for (let i = 0; i < newSize.length; i++) {
  otherS.push(newSize[i].otherSize);
}
for (let s of newColor) {
  otherC.push(s.otherColor);
}
for (let cate of newCategory) {
  otherCate.push(cate.otherCategory);
}

console.log(otherS);
console.log(otherC);
console.log(otherCate);

const renderNewItem = (input, container) => {
  const el = "_" + input.value.toUpperCase();
  console.log(el.slice(1));
  let newItem, newLabel, form, closeButton;
  const appendDeleteBtn = function () {
    form = document.createElement("form");
    closeButton = document.createElement("button");
    form.classList.add("deleteform");
    form.setAttribute("method", "post");
    form.setAttribute("data-name", el.replace(" ", "_"));
    closeButton.classList.add("close-modal");
    closeButton.innerHTML = "&times;";
    form.append(closeButton);
    container[1].appendChild(form);
  };
  const appendEl = function () {
    newItem = document.createElement("input");
    newLabel = document.createElement("label");
    newItem.setAttribute("type", "checkbox");
    newItem.setAttribute("form", "newProduct");
    newItem.name = "product[size]";
    newItem.id = el;
    newItem.setAttribute("value", el);
    newLabel.setAttribute("for", el);
    newItem.classList.add("btn-check");
    // newItem.checked = true;
    newLabel.classList.add("btn", "btn-outline-secondary");
    newLabel.textContent = el.slice(1);
  };
  for (let i = 0; i < container.length; i++) {
    appendEl();
    container[i].append(newItem);
    container[i].append(newLabel);
  }
  appendDeleteBtn();
  input.value = "";
};

const saveData = async (form, input, data, e) => {
  const formData = new FormData();
  formData.append(form, input.value);
  let en = {};

  formData.forEach((el) => {
    if (e.target.id === "otherSizeForm") en.otherSize = "_" + el;
    if (e.target.id === "otherColorForm")
      en.otherColor = "_" + el.toLowerCase();
    if (e.target.id === "otherCategoryForm")
      en.otherCategory = "_" + el.toLowerCase();
  });

  await fetch(`/products/${data}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(en),
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

const deleteItem = (e) => {
  let response = fetch(`${e.action}`, {
    method: "POST",
    body: {},
  });
  e.remove();
};
let clicked;
const click = (e, container) => {
  clicked = e.target.closest(".deleteform");
  const el = container[0].querySelector(
    `[for=${clicked.getAttribute("data-name")}`
  );
  if (!clicked) return;
  if (!clicked.previousElementSibling) return;
  if (!el) return;

  el.remove();
  clicked.previousElementSibling.remove();

  return clicked, el;
};

otherSize.addEventListener("submit", function (e) {
  e.preventDefault();
  saveData("otherSize", sizeInput, "size", e);
  renderNewItem(sizeInput, sizeContainer);
});

sizeModal.addEventListener("click", function (e) {
  click(e, sizeContainer);
  deleteItem(clicked);
  e.preventDefault();
});

otherColor.addEventListener("submit", function (e) {
  e.preventDefault();
  saveData("otherColor", colorInput, "color", e);
  renderNewItem(colorInput, colorContainer);
});

colorModal.addEventListener("click", function (e) {
  click(e, colorContainer);
  deleteItem(clicked);
  e.preventDefault();
});

otherCategory.addEventListener("submit", function (e) {
  e.preventDefault();
  saveData("otherCategory", categoryInput, "category", e);
  renderNewItem(categoryInput, categoryContainer);
});

categoryModal.addEventListener("click", function (e) {
  click(e, categoryContainer);
  deleteItem(clicked);
  e.preventDefault();
});
