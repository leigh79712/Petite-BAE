console.log(newOrder);

console.log(newOrder[0].newOrder[0].products);
const appendHtml = document.getElementsByClassName("center");
const html = `
    <div class="card mb-3" style="max-width: 800px">
      <div class="row g-0">
        <div class="col-2">
          <img
            class="shoppingCart-card-img"
            src="${newOrder[0].newOrder[0].images}"
            class="img-fluid rounded-start"
          />
        </div>
        <div class="col-7">
          <div class="card-body">
            <div class="mb-2">
              <h5 class="card-title d-inline">${newOrder[0].newOrder[0].products}</h5>
            </div>
          </div>
          <p>
            <strong>Size : </strong> ${newOrder[0].newOrder[0].size}
            <strong>Color : </strong> ${newOrder[0].newOrder[0].color}
          </p>
        </div>
`;
console.log(appendHtml);
appendHtml.insertAdjacentHTML("afterbegin", html);
