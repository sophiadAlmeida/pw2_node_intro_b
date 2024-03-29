const inquirer = require ('inquirer')
const chalk = require('chalk')
const fs = require('fs')

operation()

function operation(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            menssage: 'O que você deseja fazer?',
            choices:[
                'Criar a conta',
                'Consultar saldo',
                'Depositar',
                'Sacar',
                'Sair'
            ]
        }
    ]).then((answer) => {
        const action = answer['action']

        if(action === 'Criar conta')
        {
            createAccount()
        }
        else if(action === 'Consultar saldo')
        {
            getAccountBalance()
        }
        else if(action === 'Depositar')
        {
            deposit()
        }
        else if(action === 'Sacar')
        {
            withdraw()
        }
        else if(action === 'Sair')
        {
            console.log(chalk.bgBlue.black('Obrigada por usar o Accounts Node!'))
            process.exit()
        }
    })
}