import { Server } from 'socket.io';

import ProductManager from './managers/ProductManager.js';
const productManager = new ProductManager('./src/files/products.json');

let io;

export const init = (httpServer) => {
  io = new Server(httpServer);

  io.on('connection', (socketClient) => {
    console.log(`Se conecto un cliente (${socketClient.id})`);

    socketClient.on('addProduct', async (product) => {    //addProduct
      try {
        const addedProduct = await productManager.addProduct(product);
        const products = await productManager.getProduct();
        io.emit('updateProducts', products);
      } catch (error) {
        console.error('Error al agregar el producto:', error);
      }
    });


    socketClient.on('deleteProduct', async (productId) => {   //deleteProduct
      try {
        await productManager.deleteProduct(productId);
        const products = await productManager.getProduct();
        io.emit('updateProducts', products);
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    });
  });

  console.log('Socket iniciado');
};

export const emitFromApi = (event, data) => io.emit(event, data);
