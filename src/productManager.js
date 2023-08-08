class ProductManager {
  constructor() {
    this.products = [];
    this.lastProductId = 0;
    this.initializeProducts(); // Llamamos al método para inicializar los productos
  }

  getNextProductId() {
    this.lastProductId++;
    return this.lastProductId;
  }

  initializeProducts() {
    for (let i = 1; i <= 10; i++) {
      const product = {
        id: this.getNextProductId(),
        title: `Producto ${i}`,
        description: `Descripción del Producto ${i}`,
        price: i * 10,
        thumbnail: `imagen${i}.jpg`,
        code: `code${i}`,
        stock: i * 5,
      };
      this.products.push(product);
    }
  }

  getProducts() {
    return this.products;
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    if (this.products.some((product) => product.code === code)) {
      throw new Error('El código del producto ya existe');
    }

    const id = this.getNextProductId();
    const newProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  getProductById(productId) {
    const product = this.products.find((p) => p.id === productId);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    return product;
  }

  updateProduct(productId, updatedFields) {
    const productIndex = this.products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedFields,
      id: productId,
    };

    return this.products[productIndex];
  }

  deleteProduct(productId) {
    const productIndex = this.products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    this.products.splice(productIndex, 1);
  }
}

module.exports = ProductManager;