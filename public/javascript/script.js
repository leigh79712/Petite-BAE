// const otherSize = document.querySelector(".otherSize");
// const inputSize = document.querySelector("#otherSize");
// const otherColor = document.querySelector(".otherColor");
// const otherCategory = document.querySelector(".otherCategory");
// const sizeContainer = document.querySelector(".size");
// const editSize = document.querySelector(".editSize");

// let newItem, newLabel;
// const addNewItem = function (newItem, newLabel, input, type, container, name) {
//   newItem = document.createElement("input");
//   newLabel = document.createElement("label");
//   newItem.setAttribute("type", type);
//   newItem.form = "newProduct";
//   newItem.name = name;
//   newItem.id = input.value;
//   newItem.value = input.value;
//   newLabel.setAttribute("for", input.value);
//   newItem.classList.add("btn-check");
//   newLabel.classList.add("btn", "btn-outline-secondary");
//   newItem.textContent = input.value;
//   newLabel.textContent = input.value;
//   container.appendChild(newItem);
//   container.appendChild(newLabel);
//   console.log(newItem);
// };

// otherSize.addEventListener("submit", function (e) {
//   e.preventDefault();
//   addNewItem(
//     "newCheckbox",
//     "newCheckboxLabel",
//     inputSize,
//     "checkbox",
//     sizeContainer,
//     "product[size]"
//   );

//   console.log(sizeContainer);
// });
