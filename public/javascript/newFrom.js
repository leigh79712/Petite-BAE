console.log(newSize[0].otherSize);

const otherS = [];
const mongoose = require("mongoose");
const Size = require("./models/size");
const otherSize = document.querySelector(".otherSize");
const sizeContainer = document.querySelector(".size");
const newProduct = document.querySelector("#newProduct");
const addItem = document.querySelector(".btn-addItem");
const sizeInput = document.querySelector(".size-input");

for (let i = 0; i < newSize.length; i++) {
  // let newCheckbox = String(newSize[i].otherSize).toUpperCase();

  otherS.push(newSize[i].otherSize);
}
// for (let i = 0; i < otherS.length; i++) {
//   let newCheckbox = String(otherS[i]).toUpperCase();
//   const newItem = document.createElement("input");
//   const newLabel = document.createElement("label");
//   newItem.setAttribute("type", "checkbox");
//   newItem.setAttribute("form", "newProduct");
//   newItem.name = "product[size]";
//   newItem.id = newCheckbox;
//   newItem.setAttribute("value", newCheckbox);
//   newLabel.setAttribute("for", newCheckbox);
//   newItem.classList.add("btn-check");
//   newLabel.classList.add("btn", "btn-outline-secondary");
//   newItem.textContent = newCheckbox;
//   newLabel.textContent = newCheckbox;
//   sizeContainer.append(newItem);
//   sizeContainer.append(newLabel);
// }
console.log(otherS);
console.log(sizeContainer);

const renderNewItem = async () => {
  const el = String(sizeInput.value).toUpperCase();
  const newItem = document.createElement("input");
  const newLabel = document.createElement("label");
  const s = await new Size(el);
  s.save();
  newItem.setAttribute("type", "checkbox");
  newItem.setAttribute("form", "newProduct");
  newItem.name = "product[size]";
  newItem.id = el;
  newItem.setAttribute("value", el);
  newLabel.setAttribute("for", el);
  newItem.classList.add("btn-check");
  newLabel.classList.add("btn", "btn-outline-secondary");
  newItem.textContent = el;
  newLabel.textContent = el;

  sizeContainer.append(newItem);
  sizeContainer.append(newLabel);
};

addItem.addEventListener("click", function (e) {
  e.preventDefault();
  renderNewItem();
});
