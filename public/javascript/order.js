const appendHtml = document.getElementById("appendHtml");
let html = "";

for (let i = 0; i < orderDetail.newOrder.length; i++) {
  let order = orderDetail.newOrder[i];
  html += `<div class="card mb-3" style="max-width: 800px">
      <div class="row g-0">
        <div class="col-2">
          <img
            class="shoppingCart-card-img"
            src="${order.images[0].url}"
            class="img-fluid rounded-start"
          />
        </div>
        <div class="col-7">
          <div class="card-body">
            <div class="mb-2">
              <h5 class="card-title d-inline">${order.products}</h5>
            </div>
          </div>
          <p>
            <strong>Size : </strong> ${String(order.size).slice(1)}
            <strong>Color : </strong> ${String(order.color).slice(1)}
          </p>
        </div>
        <div class="col-3">
        <p class="mt-5">
        <strong>Price : ${order.price}
            </strong>
            <strong>Qty : ${order.qty}
            </strong>
            </p>
        </div>
        </div>
        </div>
`;
}

appendHtml.insertAdjacentHTML("afterBegin", html);
