//Acredito que no prisma não precisa disso, porque eu posso acessar as tabelas em qualquer arquivo JS que eu estiver se eu importar o Prisma!
const { ObjectId } = require('mongodb')
const Product = require('../models/Product')

//Estou importando essa minha classe productcontroller, com um método estático inerente a ela.
module.exports = class ProductController {
    static async showProducts(req, res) {
        const products = await Product.getProducts()
        res.render('products/all', { products })
    }

    static createProduct(req, res) {
        res.render('products/create')
    }

    //####################OBSERVAÇÃO MINHA######################################
    //PELO QUE EU TOU PERCEBENDO AQUI, TODA AQUELA LÓGICA DE INSERÇÃO NO BANCO DE DADOS, DE REDIRECT, RENDER! É TUDO FEITO DENTRO DO CONTROLLER
    //E NAS ROTAS, EU APENAS JOGO O MÉTODO QUE EU QUERO QUE A ROTA DISPARE QUANDO ACESSAREM ELA!
    //####################OBSERVAÇÃO MINHA######################################

    static createProductPost(req, res) {
        //Eu já estou tratando o JSON nas requisiçoes no index.js, não preciso tratar denovo aqui!
        //É importante que ele esteja sempre ANTES das minhas ROTAS que vão precisar desses dados.
        const name = req.body.name 
        const image = req.body.image
        const price = req.body.price 
        const description = req.body.description 

        //Vou instanciar meu objeto agora, lembre-se o método SAVE é método do objeto e não da classe (static)!
        //Ou seja, só conseguirei salvar produtos no banco de dados se eu instanciar um objeto!
        const product = new Product(name, image, price, description)

        product.save()

        res.redirect('/products')
    }

    static async getProduct(req,res) {
        const id = req.params.id

        const product = await Product.getProductById(id)

        res.render('products/product', { product })
    }

    static async removeProduct(req, res) {
        const id = req.params.id
        
        await Product.removeProductById(id)

        res.redirect('/products')
    }

    static async editProduct(req, res) {
        const id = req.params.id
        
        const product = await Product.getProductById(id)

        res.render('products/edit', { product })
    }

    static async editProductPost(req, res) {
        const id = req.body.id
        const name = req.body.name
        const image = req.body.image
        const price = req.body.price
        const description = req.body.description
        
        const product = new Product(name, image, price, description)
        
        await product.updateProduct(id)

        res.redirect('/products')
    }
}