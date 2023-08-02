const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path
    }
    writeFile = async data => {
        try {
            await fs.promises.writeFile(
                this.path, JSON.stringify(data, null, 2)
            )
        } catch (error) {
            console.log(error)
        }
    }
    getProducts = async () => {
        try {
            const productsList = await fs.promises.readFile(this.path, 'utf-8')
            const products = productsList === "" ? [] :  JSON.parse(productsList)
            return products
        } catch (error) {
            if(error.message.includes('ENOENT: no such file or directory')) return []
            console.log(error)
        }
    }
    addProducts = async product => {
        try {
            if (this.#paramsValidator(product)) {
            let products = await this.getProducts()
            let newId
            let newCode = products.find(prod => prod.code === product.code)
            //Chequeo que no se repitan las id
            products.length === 0 ? newId = 1 : newId = products[products.length - 1].id + 1
            //Chequeo que todos los campos esten completos
            if(!Object.values(product).every(value => value)){
                return console.log('All fields are required')
            }
            //Chequeo que el campo "code" no se repita
            if(newCode) return console.log('a product has already been entered with that code')
            const newProduct = {...product, id:newId}
            products.push(newProduct)
            await this.writeFile(products)
            return this.getProducts()
        }
        } catch (error) {
            console.log(error)
        }
    }
    updateProducts = async (id, data) => {
        try {
            const products = await this.getProducts()
            let product = await this.getProductById(id)
            if(!product) return
            Object.assign(products[id-1], data)
            await this.writeFile(products)
        } catch (error) {
            console.log(error)
        }
    }
    getProductById = async id => {
        try {
            let products = await this.getProducts()
            const product = products.find(prod => prod.id === id)
            return product ? product : console.log('Product not found')
        } catch (error) {
            console.log(error)
        }
    }
    deleteProduct = async id => {
        try {
            let products = await this.getProducts()
            let product = await this.getProductById(id)
            if(!product) return
            const obj = products.filter(obj => obj.id !== id)
            console.log(`Product with id: ${product.id} was successfully removed`);
            await this.writeFile(obj)
        } catch (error) {
            console.log(error)
        }
    }

    #paramsValidator(product) {
        if( product.hasOwnProperty('title') &&
            product.hasOwnProperty('description') &&
            product.hasOwnProperty('price') &&
            product.hasOwnProperty('thumbnail') &&
            product.hasOwnProperty('code') &&
            product.hasOwnProperty('stock')
            ){
                return true
            }
            return console.log('To add a product you must do it with all its properties')
        }
}





module.exports = ProductManager
