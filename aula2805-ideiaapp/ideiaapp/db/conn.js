const { Sequelize } = require('sequelize')
require('dotenv/congif')

const sequelize = new Sequelize('ideias_db', process.env.AZURE_USER_MYSQL, 
process.env.AZURE_USER_MYSQL, {
    host: process.env.AZURE_URL_MYSQL,
    dialect: 'mysql',
})

try{
    sequelize.authenticate()
    console.log('Conectado com sucesso ao MySQL Xampp')
}catch(error){
    console.error(`Deu erro na conexão: ${error}`)
}

module.exports = sequelize