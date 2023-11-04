const mongoose = require('mongoose')
//Importando o Schema!
const {Schema} = mongoose

//Método .model() onde inserimos o schema dentro
const Product = mongoose.model(
  //nome do model, depois instâncio!
  'Product',
  new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true}
  })
)

module.exports = Product