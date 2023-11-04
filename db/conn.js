//MongloClient é um objeto dentro do pacote MongoDB que vai ajudar a gente a conectar com o banco de dados!
const {MongoClient} = require('mongodb')

//protocolo do mongodb + o ip do nosso server
const uri = "mongodb://127.0.0.1:27017/testemongodb"

//
const client = new MongoClient(uri)

async function run() {
    try {
        await client.connect()
        console.log("Conectando ao MongoDB!")
    } catch (error) {
        console.log(error)
    }
}

run()

//Quando eu tiver acesso ao client ele já estará conectado, porque eu chamei a função run() primeiro! Daí ela espera a conexão pra depois importar!
module.exports = client