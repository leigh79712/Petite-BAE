const saveData = async (form, input, data, e) => {
  const formData = new FormData();
  formData.append(form, input.value);
  let en = {};

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
