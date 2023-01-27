let count = 0;
let editMode = false;
let productList = [];
function addInputMsg() {
  const msg = document.getElementById("msg");
  msg.innerText = `Nice to have the product added`;
  setTimeout(function () {
    msg.innerText = ``;
  }, 3000);
}

class Product {
  constructor(pid, pname, price) {
    this.productId = pid;
    this.productName = pname;
    this.productPrice = price;
  }
  isEmpty() {
    return Boolean(!(this.productId && this.productName && this.productPrice));
  }
  isIdDupicate() {
    let duplicate = productList.find((p) => {
      return p.productId === this.productId;
    });
    return Boolean(duplicate);
  }
  isLongerPName() {
    return Boolean(this.productName.length > 60);
  }
  isPriceNegative() {
    return Boolean(this.productPrice < 0);
  }
  isPriceValid() {
    return Boolean(this.productPrice <= 100000.0);
  }
  validateProduct() {
    if (this.isEmpty()) {
      alert("Fields can not be empty!");
      return false;
    }
    if (!editMode) {
      if (this.isIdDupicate()) {
        alert("Product ID must be unique!");
        return false;
      }
    }
    if (this.isLongerPName()) {
      alert("Product name can not be longer than 60 characters!");
      return false;
    }
    if (this.isPriceNegative()) {
      alert("Product price can not be negative");
      return false;
    }
    if (!this.isPriceValid()) {
      alert("Price can not be more than 100000.00");
      return false;
    }
    return true;
  }
}
function getInput() {
  let pid = document.getElementById("pid").value;
  let pname = document.getElementById("pname").value.trim();
  let price = document.getElementById("price").value;
  let product = new Product(pid, pname, price);
  if (product.validateProduct()) {
    productList.push(product);
    count++;
    addInputMsg();
    return product;
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
  let cells = row.getElementsByTagName("td");
  let product = new Product(
    cells[0].innerText,
    cells[1].innerText,
    cells[2].innerText
  );

  productList.splice(productList.indexOf(product), 1);
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
function updateProduct(productIdToUpdate) {
  editMode = true;
  let pname = document.getElementById("pname").value;
  let price = document.getElementById("price").value;
  let product = new Product(productIdToUpdate, pname, price);

  if (product.validateProduct()) {
    addRow(product);
  }
}

function editProduct(productIdToEdit) {
  let row = document.getElementById(productIdToEdit);
  let cells = row.getElementsByTagName("td");
  let product = new Product(
    cells[0].innerText,
    cells[1].innerText,
    cells[2].innerText
  );

  let pID = document.getElementById("pid");
  pID.value = product.productId;
  pID.disabled = true;
  let pName = document.getElementById("pname");
  pName.value = product.productName;
  let pPrice = document.getElementById("price");
  pPrice.value = product.productPrice;

  let update = document.getElementById("add");
  update.innerHTML = `<button id="update-product-btn" onclick="updateProduct(${productIdToEdit})">UPDATE</button>`;
}
function addRow(product) {
  if (!editMode) {
    const table = document.getElementsByTagName("tbody")[0];
    const e1 = document.createElement("tr");
    e1.setAttribute("id", product.productId);
    e1.innerHTML = `<td>${product.productId}</td>
      <td>${product.productName}</td>
      <td>${product.productPrice}</td>
      <td>
        <button class = "edit-btn" onclick = "editProduct(${e1.getAttribute(
          "id"
        )})">EDIT</button>
        <button class = "delete-btn" onclick = "confirmation(${e1.getAttribute(
          "id"
        )})">DELETE</button>
      </td>`;
    table.insertBefore(e1, table.firstChild);
  } else {
    let add = document.getElementById("add");
    let row = document.getElementById(product.productId);
    add.innerHTML = `<button id="add-product-btn" onclick="addProduct()">ADD</button>`;
    row.innerHTML = `<td>${product.productId}</td>
      <td>${product.productName}</td>
      <td>${product.productPrice}</td>
      <td>
        <button class = "edit-btn" onclick = "editProduct(${row.getAttribute(
          "id"
        )})">EDIT</button>
        <button class = "delete-btn" onclick = "confirmation(${row.getAttribute(
          "id"
        )})">DELETE</button>
      </td>`;
    document.getElementById("pid").disabled = false;
  }
  clearInput();
}
function addProduct() {
  editMode = false;
  let product = getInput();

  if (count > 0) {
    const tblHead = document.getElementById("tbl-head");
    addTableHead(tblHead);
    addRow(product);
  }
}
