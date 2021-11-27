const otherS = [];
const otherSize = document.getElementById("otherSizeForm");
const sizeContainer = document.querySelectorAll(".size");
const newProduct = document.querySelector("#newProduct");
const addItem = document.querySelector(".btn-addItem");
const sizeInput = document.querySelector(".size-input");
const deleteForm = document.querySelectorAll(".deleteform");

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

    s.appendChild(newItem);
    s.appendChild(newLabel);
  }
  const appendDeleteBtn = function () {
    const form = document.createElement("form");
    const closeButton = document.createElement("button");
    form.classList.add("deleteform");
    form.setAttribute("action", `/products/size/?_method=DELETE`);
    form.setAttribute("method", "post");
    closeButton.classList.add("close-modal");
    s.appendChild(form);
    form.append(closeButton);
  };
  console.log(newSize);

  sizeInput.value = "";
};

async function saveData() {
  const formData = new FormData();
  formData.append(otherSize, sizeInput.value);
  let en = {};

  formData.forEach((el) => {
    en.otherSize = el;
  });

  let response = await fetch("/products/size", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
    body: JSON.stringify(en),
  });
  let body = await response.json();
  console.log(body);
}

const deleteData = (e) => {
  let response = fetch(`${e.target.action}`, {
    method: "POST",
    body: {},
  });
  // let body = response.json();
  console.log(response);
};

otherSize.addEventListener("submit", function (e) {
  e.preventDefault();
  saveData();
  renderNewItem();
});
for (let deleteF of deleteForm) {
  deleteF.addEventListener("submit", function (e) {
    deleteData(e);
    e.preventDefault();
  });
}
