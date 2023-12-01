(function () {
  const socket = io();

  const addProductForm = document.getElementById('addProductForm');
  const deleteProductForm = document.getElementById('deleteProductForm');
  const productList = document.getElementById('productList');

  socket.on('updateProducts', (products) => {
    updateProductList(products);
  });

  function updateProductList(products) {                            //Actualizar la lista de productos
    productList.innerHTML = '';

    products.forEach((product) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${product.title} - ${product.price}`;
      productList.appendChild(listItem);
    });
  }

  addProductForm.addEventListener('submit', async (event) => {      //Formulario para agregar un producto
    event.preventDefault();

    const title = document.getElementById('addTitle').value;
    const price = document.getElementById('addPrice').value;

    socket.emit('addProduct', { title, price });

    document.getElementById('addTitle').value = '';
    document.getElementById('addPrice').value = '';
  });

  deleteProductForm.addEventListener('submit', async (event) => {   //Formulario para eliminar un producto
    event.preventDefault();

    const productId = parseInt(document.getElementById('deleteProductId').value);

    socket.emit('deleteProduct', productId);

    document.getElementById('deleteProductId').value = '';
  });

})();
