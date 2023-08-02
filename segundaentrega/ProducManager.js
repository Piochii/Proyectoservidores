class ProductManager {
    constructor() {
      this.products = [];
      this.lastProductId = 0;
    }
  
    getNextProductId() {
      this.lastProductId++;
      return this.lastProductId;
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
  
 
  const productManager = new ProductManager();
  
  
  console.log(productManager.getProducts());
  
  
  const newProduct = productManager.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25,
  });
  console.log(newProduct);
  
  
  console.log(productManager.getProducts());
  
  
  try {
    const product = productManager.getProductById(newProduct.id);
    console.log(product);
  } catch (error) {
    console.log(error.message);
  }
  
  
  try {
    const updatedProduct = productManager.updateProduct(newProduct.id, {
      price: 250,
      stock: 20,
    });
    console.log(updatedProduct);
  } catch (error) {
    console.log(error.message);
  }
  
  
  try {
    productManager.deleteProduct(newProduct.id);
    console.log(productManager.getProducts());
  } catch (error) {
    console.log(error.message);
  }