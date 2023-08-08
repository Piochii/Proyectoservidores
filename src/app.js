const express = require('express');
const app = express();
const ProductManager = require('./productManager');

const productManager = new ProductManager();

app.get('/products', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const products = limit ? productManager.getProducts().slice(0, limit) : productManager.getProducts();
  res.json(products);
});

app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    const product = productManager.getProductById(productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

app.get('/products/first/:limit', (req, res) => {
  const limit = parseInt(req.params.limit);
  const products = productManager.getProducts().slice(0, limit);
  res.json(products);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});


app.listen(8080, () => {
  console.log(`Servidor corriendo en el puerto 8080`);
});