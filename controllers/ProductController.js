//Acredito que no prisma não precisa disso, porque eu posso acessar as tabelas em qualquer arquivo JS que eu estiver se eu importar o Prisma!
const { ObjectId } = require('mongodb')
const Product = require('../models/Product')

//Estou importando essa minha classe productcontroller, com um método estático inerente a ela.
module.exports = class ProductController {
    static async showProducts(req, res) {
        const products = await Product.find().lean()
        res.render('products/all', { products })
    }

    static createProduct(req, res) {
        res.render('products/create')
    }

    static async createProductPost(req, res) {
        const name = req.body.name 
        const image = req.body.image
        const price = req.body.price 
        const description = req.body.description 

        //coloco em {} minhas constantes pra instanciar o produto, pq eu quero passar um objeto pro model
        const product = new Product({name, image, price, description})

        await product.save()

        res.redirect('/products')
    }

    static async getProduct(req,res) {
        const id = req.params.id

        const product = await Product.findById(id).lean()

        res.render('products/product', { product })
    }

    /*static async removeProduct(req, res) {
        const id = req.params.id
        
        await Product.removeProductById(id)

        res.redirect('/products')
    }*/

    static async editProduct(req, res) {
        const id = req.params.id
        
        const product = await Product.findById(id).lean()

        res.render('products/edit', { product })
    }

    static async editProductPost(req, res) {
        const id = req.body.id
        const name = req.body.name
        const image = req.body.image
        const price = req.body.price
        const description = req.body.description
        
        //posso criar um objeto direto, não preciso instanciar nada
        const product = {name, image, price, description}
        
        //primeiro passo ID como primeiro parametro, como segundo argumento eu passo o product, que é a entidade que eu quero atualizar (os dados novos)!
        await Product.updateOne({ _id: id }, product)

        res.redirect('/products')
    }
}