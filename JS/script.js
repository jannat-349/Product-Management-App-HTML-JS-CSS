let productId;
let productName;
let productPrice;
let count = 0;
function isEmpty() {
  return (productId && productName && productPrice)
    ? false
    : true;
}
const pidList = [];
function isIdDupicate() {
  return pidList.includes(productId);
}
function getInput() {
  productId = document.getElementById("pid").value;
  productName = document.getElementById("pname").value;
  productPrice = document.getElementById("price").value;
  if(isEmpty()) {
    alert("Fields can not be empty!");
    return;
  }
  if(isIdDupicate(productId)) {
    alert("Product ID must be unique!")
    return;
  }
  count++;
  pidList.push(productId);
  return {
    pid: productId,
    pname: productName,
    price: productPrice,
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
  let product = getInput();
  if (count > 0) {
    const tblHead = document.getElementById("tbl-head");
    addTableHead(tblHead);
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
}
