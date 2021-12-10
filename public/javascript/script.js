const deleteForm = document.querySelectorAll(".delete-form");

const deleteItem = (e) => {
  let response = fetch(`${e.target.action}`, {
    method: "POST",
    body: {},
  });
};
deleteForm.forEach((el) => {
  el.addEventListener("submit", function (e) {
    deleteItem(e);
    console.log(e);
    e.preventDefault();
  });
});
