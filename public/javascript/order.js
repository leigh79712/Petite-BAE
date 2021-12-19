const appendHtml = document.getElementById("appendHtml");
let html = "";
let orderLength = newOrder.length - 1;

for (let i = 0; i <= orderLength; i++) {
  html += `<div class="card mb-3" style="max-width: 800px">
      <div class="row g-0">
        <div class="col-2">
          <img
            class="shoppingCart-card-img"
            src="${newOrder[orderLength].newOrder[i].images}"
            class="img-fluid rounded-start"
          />
        </div>
        <div class="col-7">
          <div class="card-body">
            <div class="mb-2">
              <h5 class="card-title d-inline">${
                newOrder[orderLength].newOrder[i].products
              }</h5>
            </div>
          </div>
          <p>
            <strong>Size : </strong> ${String(
              newOrder[orderLength].newOrder[i].size
            ).slice(1)}
            <strong>Color : </strong> ${String(
              newOrder[orderLength].newOrder[i].color
            ).slice(1)}
          </p>
        </div>
        <div class="col-3">
        <p class="mt-5">
        <strong>Price : ${newOrder[orderLength].newOrder[i].price}
            </strong>
            <strong>Qty : ${newOrder[orderLength].newOrder[i].qty}
            </strong>
            </p>
        </div>
        </div>
        </div>

`;
}

appendHtml.insertAdjacentHTML("afterBegin", html);
