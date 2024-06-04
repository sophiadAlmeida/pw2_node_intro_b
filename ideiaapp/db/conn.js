const { Sequelize } = require('sequelize')
const fs = require('fs')


const sequelize = new Sequelize("ideias_db",
"sophiaevitoria",
"SosoVi2024", {
    host: "sosoviideiasapp.mysql.database.azure.com",
    dialect: 'mysql',
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        // caminho para o certificado CA
          ca: fs.readFileSync(__dirname + '/DigiCertGlobalRootCA.crt')
        }
      }
})


try{
    sequelize.authenticate()
    console.log('Conectado com Deploy Azure Server MySql Flex')
}catch(error){
    console.error(`Deu erro na conexãocom Azure: ${error}`)
}


module.exports = sequelize