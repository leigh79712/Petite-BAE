console.log(newSize[0].otherSize);

const otherS = [];
const otherSize = document.querySelector(".otherSize");
const sizeContainer = document.querySelector(".size");
const newProduct = document.querySelector("#newProduct");

// let newLable, newItem;
for (let i = 0; i < newSize.length; i++) {
  // let newCheckbox = String(newSize[i].otherSize).toUpperCase();

  otherS.push(newSize[i].otherSize);
  // newItem = document.createElement("input");
  // newLable = document.createElement("lable");
  // newItem.setAttribute("type", "checkbox");
  // newItem.form = "newProduct";
  // newItem.name = "size";
  // newItem.id = newCheckbox;
  // newItem.value = newCheckbox;
  // newLable.setAttribute("for", newCheckbox);
  // newItem.classList.add("btn-check");
  // newLable.classList.add("btn", "btn-outline-secondary");
  // newItem.textContent = newCheckbox;
  // newLable.textContent = newCheckbox;
  // console.log(newItem);
  // console.log(sizeContainer);
  // sizeContainer.appendChild(newItem);
  // sizeContainer.appendChild(newLable);
}
for (let i = 0; i < otherS.length; i++) {
  let newCheckbox = String(otherS[i]).toUpperCase();
  const newItem = document.createElement("input");
  const newLable = document.createElement("lable");
  newItem.setAttribute("type", "checkbox");
  newItem.setAttribute("form", "newProduct");
  newItem.name = "product[size]";
  newItem.id = newCheckbox;
  newItem.setAttribute("value", newCheckbox);
  newLable.setAttribute("for", newCheckbox);
  newItem.classList.add("btn-check");
  newLable.classList.add("btn", "btn-outline-secondary");
  newItem.textContent = newCheckbox;
  newLable.textContent = newCheckbox;
  sizeContainer.append(newItem);
  sizeContainer.append(newLable);
}
console.log(otherS);
console.log(sizeContainer);
// newProduct.addEventListener("submit", function (e) {

// });
