const otherS = [];
const otherSize = document.getElementById("otherSizeForm");
const sizeContainer = document.querySelectorAll(".size");
const newProduct = document.querySelector("#newProduct");
const addItem = document.querySelector(".btn-addItem");
const sizeInput = document.querySelector(".size-input");

for (let i = 0; i < newSize.length; i++) {
  // let newCheckbox = String(newSize[i].otherSize).toUpperCase();

  otherS.push(newSize[i].otherSize);
}

console.log(otherS);
console.log(sizeContainer[1]);

const renderNewItem = () => {
  const el = String(sizeInput.value).toUpperCase();

  for (let s of sizeContainer) {
    const newItem = document.createElement("input");
    const newLabel = document.createElement("label");
    const form = document.createElement("form");
    const closeButton = document.createElement("button");

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
    form.classList.add("deleteform");
    form.setAttribute("action", `/products/size/${s._id}?_method=DELETE`);
    form.setAttribute("method", "post");
    closeButton.classList.add("close-modal");
    s.appendChild(form);
    form.appendChild(closeButton);
    s.appendChild(newItem);
    s.appendChild(newLabel);
  }
};

function saveData() {
  const formData = new FormData();
  formData.append("otherSize", JSON.stringify(sizeInput.value));
  formData.forEach((el) => {
    console.log(el);
  });

  const ajax = new XMLHttpRequest();
  ajax.open("POST", "/products/size", true);
  formData.append("otherSize", sizeInput.value);
  ajax.setRequestHeader("Content-type", "application/json; charset=utf-8");
  ajax.send(formData);
  console.log(formData);
}

console.log(otherSize);
addItem.addEventListener("click", function (e) {
  renderNewItem();
  e.preventDefault();
});
