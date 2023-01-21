function getInput() {
  return {
    pid: document.getElementById("pid").value,
    pname: document.getElementById("pname").value,
    price: document.getElementById("price").value,
  };
}

function addTableHead(tblHead) {
  tblHead.innerHTML = `
    <th>PRODUCT ID</th>
    <th>PRODUCT NAME</th>
    <th>PRODUCT PRICE</th>
    <th>OPTION</th>`;
}

function addProduct() {
  const tblHead = document.getElementById("tbl-head");
  addTableHead(tblHead);
  let product = getInput();
  const table = document.getElementById("tbl");
  const e1 = document.createElement("tr");
  e1.innerHTML = `<td>${product.pid}</td>
    <td>${product.pname}</td>
    <td>${product.price}</td>
    <td>
      <button>EDIT</button>
      <button>DELETE</button>
    </td>`;
  table.appendChild(e1);
}
