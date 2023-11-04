const express = require("express")
const router = express.Router()
const ProductController = require('../controllers/ProductController.js')

//Esse método da minha classe recebe como parâmetros "req" e "res", quando eu passo ele aqui nesse router.get como callback
//Ele recebe esse req e res por padrão, o node cuida disso pra mim.
router.get('/create', ProductController.createProduct)
router.post('/create', ProductController.createProductPost)
    //O QUE TÁ ACONTECENDO AQUI:
    //1) Quando eu acesso essa rota de post, o express pega essa URL envia para o meu método.
    //2) Dentro do método eu posso acessar os dados da requisição, como req.body (estou fazendo isso, só quero enfatizar.)
    //3) E por fim, posso aplicar toda a lógica de inserção no banco de dados que é o objetivo aqui dessa rota.
router.post('/remove/:id', ProductController.removeProduct)
router.post('/edit', ProductController.editProductPost)
router.get('/edit/:id', ProductController.editProduct)
router.get('/:id', ProductController.getProduct)
router.get('/', ProductController.showProducts)

module.exports = router