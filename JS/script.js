let productId;
let productName;
let productPrice;
let count = 0;
function isEmpty() {
  return productId && productName && productPrice ? false : true;
}
const pidList = [];
function isIdDupicate() {
  return pidList.includes(productId);
}
function isLongerPName() {
  return productName.length > 60 ? true : false;
}
function isPriceNegative() {
  return productPrice < 0 ? true : false;
}
function isPriceValid() {
  return productPrice <= 100000.0 ? true : false;
}
function addInputMsg() {
  const msg = document.getElementById("msg");
  msg.innerText = `Nice to have the product added`;
  setTimeout(function () {
    msg.innerText = ``;
  }, 3000);
}
function validateInput() {
  if (isEmpty()) {
    alert("Fields can not be empty!");
    return false;
  }
  if (isIdDupicate(productId)) {
    alert("Product ID must be unique!");
    return false;
  }
  if (isLongerPName()) {
    alert("Product name can not be longer than 60 characters!");
    return false;
  }
  if (isPriceNegative()) {
    alert("Product price can not be negative");
    return false;
  }
  if (!isPriceValid()) {
    alert("Price can not be more than 100000.00");
    return false;
  }
  return true;
}
function getInput() {
  productId = document.getElementById("pid").value;
  productName = document.getElementById("pname").value.trim();
  productPrice = document.getElementById("price").value;
  if (validateInput()) {
    count++;
    pidList.push(productId);
    addInputMsg();
    return {
      pid: productId,
      pname: productName,
      price: productPrice,
    };
  }
}

function addTableHead(tblHead) {
  tblHead.innerHTML = `
    <th>PRODUCT ID</th>
    <th>PRODUCT NAME</th>
    <th>PRODUCT PRICE</th>
    <th>OPTION</th>`;
}
let p;
function confirmation(pp) {
  document.getElementById("confirm").hidden = false;
  const deleteMsg = document.getElementById("delete-msg");
  deleteMsg.innerText = `Do you really want to delete the product with id ${pp}`;
  p = pp;
}
function deleteElement() {
  const row = document.getElementById(p);
  row.remove();
  pidList.splice(pidList.indexOf(row.getAttribute("id")), 1);
  count--;
  if (count === 0) {
    const tblHead = document.getElementById("tbl-head");
    tblHead.innerHTML = `<thead id = "tbl-head">
    <th>Nothing to show!</th>
  </thead>`;
  }
  document.getElementById("confirm").hidden = true;
}
function cancelDelete() {
  document.getElementById("confirm").hidden = true;
}
function validateUpdatedInput() {
  if (isEmpty()) {
    alert("Fields can not be empty!");
    return false;
  }
  if (isLongerPName()) {
    alert("Product name can not be longer than 60 characters!");
    return false;
  }
  if (isPriceNegative()) {
    alert("Product price can not be negative");
    return false;
  }
  if (!isPriceValid()) {
    alert("Price can not be more than 100000.00");
    return false;
  }
  return true;
}
function clearInput() {
  const inputBox = document.getElementById("input");
  inputBox.innerHTML = `<div class="pid-input">
  <label>PRODUCT ID: </label>
  <input type="number" id="pid" placeholder="Enter Your Product ID" />
</div>
<div class="pname-input">
  <label>PRODUCT NAME: </label>
  <input type="text" id="pname" placeholder="Enter Your Product Name" />
</div>
<div class="price-input">
  <label>PRICE: </label>
  <input
    type="number"
    id="price"
    placeholder="Enter Your Product Price"
  />
</div>
<div id="add">
  <button id="add-product-btn" onclick="addProduct()">ADD</button>
</div>`;
}
function updateProduct(pp) {
  let row = document.getElementById(pp);
  let pId = document.getElementById("pid");
  let pName = document.getElementById("pname");
  let pPrice = document.getElementById("price");
  productId = pId.value;
  productName = pName.value;
  productPrice = pPrice.value;
  if (validateUpdatedInput()) {
    let add = document.getElementById("add");
    add.innerHTML = `<button id="add-product-btn" onclick="addProduct()">ADD</button>`;
    row.innerHTML = `<td>${productId}</td>
      <td>${productName}</td>
      <td>${productPrice}</td>
      <td>
        <button class = "edit-btn" onclick = "editProduct(${row.getAttribute(
          "id"
        )})">EDIT</button>
        <button class = "delete-btn" onclick = "confirmation(${row.getAttribute(
          "id"
        )})">DELETE</button>
      </td>`;
    pId.disabled = false;
    clearInput();
  }
}

function editProduct(pp) {
  let row = document.getElementById(pp);
  let cells = row.getElementsByTagName("td");
  // alert(cells[0].innerText);
  // alert(cells[1].innerText);
  // alert(cells[2].innerText);
  let pID = document.getElementById("pid");
  pID.value = cells[0].innerText;
  pID.disabled = true;
  let pName = document.getElementById("pname");
  pName.value = cells[1].innerText;
  let pPrice = document.getElementById("price");
  pPrice.value = cells[2].innerText;
  let update = document.getElementById("add");
  update.innerHTML = `<button id="update-product-btn" onclick="updateProduct(${pp})">UPDATE</button>`;
}

function addProduct() {
  let product = getInput();
  if (count > 0) {
    const tblHead = document.getElementById("tbl-head");
    addTableHead(tblHead);
    const table = document.getElementsByTagName("tbody")[0];
    const e1 = document.createElement("tr");
    e1.setAttribute("id", product.pid);
    e1.innerHTML = `<td>${product.pid}</td>
    <td>${product.pname}</td>
    <td>${product.price}</td>
    <td>
      <button class = "edit-btn" onclick = "editProduct(${e1.getAttribute(
        "id"
      )})">EDIT</button>
      <button class = "delete-btn" onclick = "confirmation(${e1.getAttribute(
        "id"
      )})">DELETE</button>
    </td>`;
    table.appendChild(e1);
    clearInput();
  }
}
