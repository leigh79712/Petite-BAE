// const otherSize = document.querySelector(".otherSize");
// const inputSize = document.querySelector("#otherSize");
// const otherColor = document.querySelector(".otherColor");
// const otherCategory = document.querySelector(".otherCategory");
// const sizeContainer = document.querySelector(".size");
// const editSize = document.querySelector(".editSize");

// let newItem, newLable;
// const addNewItem = function (newItem, newLable, input, type, container, name) {
//   newItem = document.createElement("input");
//   newLable = document.createElement("lable");
//   newItem.setAttribute("type", type);
//   newItem.form = "newProduct";
//   newItem.name = name;
//   newItem.id = input.value;
//   newItem.value = input.value;
//   newLable.setAttribute("for", input.value);
//   newItem.classList.add("btn-check");
//   newLable.classList.add("btn", "btn-outline-secondary");
//   newItem.textContent = input.value;
//   newLable.textContent = input.value;
//   container.appendChild(newItem);
//   container.appendChild(newLable);
//   console.log(newItem);
// };

// otherSize.addEventListener("submit", function (e) {
//   e.preventDefault();
//   addNewItem(
//     "newCheckbox",
//     "newCheckboxLable",
//     inputSize,
//     "checkbox",
//     sizeContainer,
//     "product[size]"
//   );

//   console.log(sizeContainer);
// });
