class ProductManager {
    constructor() {
      this.products = [];
    }
  
    generateId() {
      return Math.random().toString(36).substr(2, 9);
    }
  
    getProducts() {
      return this.products;
    }
  
    addProduct({ title, description, price, thumbnail, code, stock }) {
      if (this.products.some((product) => product.code === code)) {
        throw new Error('El código del producto ya existe');
      }
  
      const id = this.generateId();
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
  }
  
  
  const productManager = new ProductManager();
  
  
  console.log(productManager.getProducts()); 
  
 
  try {
    productManager.addProduct({
      title: 'producto prueba',
      description: 'Este es un producto prueba',
      price: 200,
      thumbnail: 'Sin imagen',
      code: 'abc123',
      stock: 25,
    });
  } catch (error) {
    console.log(error.message);
  }
  
 
  console.log(productManager.getProducts());
  
 
  try {
    productManager.addProduct({
      title: 'producto prueba 2',
      description: 'Este es otro producto prueba',
      price: 150,
      thumbnail: 'Sin imagen',
      code: 'abc123', // Código repetido
      stock: 10,
    });
  } catch (error) {
    console.log(error.message);
  }
  
 
  try {
    const product = productManager.getProductById('un_id_existente');
    console.log(product);
  } catch (error) {
    console.log(error.message);
  }
  
 
  try {
    const product = productManager.getProductById('un_id_inexistente');
    console.log(product);
  } catch (error) {
    console.log(error.message);
  }

