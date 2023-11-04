//Vou chamar a conexão com o banco, porque eu vou ter uma operação com o banco aqui!
const conn = require('../db/conn')
const {ObjectId} = require('mongodb')

class Product {
  constructor(name, image, price, description) {
    this.name = name
    this.image = image
    this.price = price
    this.description = description
  }

  //Método pra salvar produtos no db!
  save() {
    //Chamando a conexão --> conn
    //Invocando o banco de dados --> db()
    //Dizendo a collection --> collection('products')
    //Método que eu vou usar --> insertOne
    const product = conn.db().collection('products').insertOne({
        name: this.name,
        image: this.image,
        price: this.price,
        description: this.description
    })
    return product
  }

  static getProducts() {
    //O método toArray é porque os dados resgatados aqui vem em um cursor, que é basicamente um array também, mas não da pra gente fazer loop.
    const products = conn.db().collection('products').find().toArray()
    return products
    //Não vou implementar lógica aqui, apenas tou retornando esse array de objetos ai, e o controller que se vire!
  }

  static async getProductById(id) {
    //o _id se refere ao campo do mongodb e o id sem underline é o parametro!
    //a estrutura do ID do mongoDB é diferente então precisamos tratar isso, transformando meu id em um objetctID!
    const objectId = new ObjectId(id)

    const product = await conn.db().collection('products').findOne(
      {
        _id: objectId
      }
    )
    return product
    //Não vou implementar lógica aqui, apenas tou retornando o produto, e o controller que se vire!
  }

  static async removeProductById(id) {
    const objectId = new ObjectId(id)

    await conn.db().collection('products').deleteOne({_id: objectId})
    return
  }

  updateProduct(id) {
    const objectId = new ObjectId(id)
    // Sempre que tiver um $ se refere a um operador do mongoDB
    //com $set: this eu estou dizendo pra atualizar o objeto todo!
    conn.db().collection('products').updateOne({_id: objectId}, {$set: this})

    return
  }
}

//Exportando minha classe
module.exports = Product