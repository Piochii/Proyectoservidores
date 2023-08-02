const ProductManager = require('./app.js')
const products = new ProductManager('./products.json')

async function Test() {

    const product1 = {
        title: 'Product 1',
        description: 'This is a test product',
        price: 1000,
        thumbnail: 'No image',
        code: '001',
        stock: 10
    }
    const product2 = {
        title: 'Product 2',
        description: 'This is a test product',
        price: 1000,
        thumbnail: 'No image',
        code: '002',
        stock: 10
    }
    const product3 = {
        title: 'Product 3',
        description: 'This is a test product',
        price: 1000,
        thumbnail: 'No image',
        code: '003',
        stock: 10
    }
    const product4 = {
        title: 'Product 4',
        description: 'This is a test product',
        price: 1000,
        thumbnail: 'No image',
        code: '005',
        stock: 10
    }

   
await products.addProducts(product4).then(data => console.log(data))


}
Test()
