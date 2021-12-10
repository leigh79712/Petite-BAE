const deleteForm = document.querySelectorAll(".delete-form");

const deleteItem = (e) => {
  let response = fetch(`${e.target.action}`, {
    method: "POST",
    body: {},
  });
};

deleteForm.forEach((el) => {
  el.addEventListener("submit", function (e) {
    const deleteDiv = e.target.closest(".delete-div");
    deleteItem(e);
    e.target.remove();
    deleteDiv.remove();
    e.preventDefault();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("everything is loaded");
});
