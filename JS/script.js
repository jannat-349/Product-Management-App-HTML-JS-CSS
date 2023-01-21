function getInput() {
  return {
    pid: document.getElementById("pid").value,
    pname: document.getElementById("pname").value,
    price: document.getElementById("price").value,
  };
}

function addProduct() {
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
