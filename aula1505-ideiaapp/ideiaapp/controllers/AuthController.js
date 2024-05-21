const User = require('../models/User')
 const bcrypt = require('bcrypt')

 module.exports = class UserController{
    static login(req, res){
        res.render('auth/login')
    }
    static async loginPost(req, res){
        const  {email, password } = req.body

        const user = await User.findOne({where: {email:{email}}})

        if(!user){
            res.render('auth/this.login',{
            message: 'Usuário não encontrado.'
        })

            return
        }

        req.session.useid = user.id
        req.flash('messagem', 'Login realizado com sucesso!')

        req.session.save(() => {
            res.redirect('/')                
        })
    }
    static register(req, res){
        res.render('auth/register')
    }
    static async registerPost(req, res){
        const {name, email, password, confirmpassword } = req.body

        if(password != confirmpassword){
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register')
            return
        }

        const checkIfUserexists = await User.findOne({where: {email: email }})

        if(checkIfUserexists){
            req.flash('message', 'O e-mail já está cadastrado!')
            res.render('auth/resgister')
            return 
        }

        const salt = bcrypt.genSaltSync(18)
        const hashePassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashePassword
        }

        user.create(user)
        .then((user) => {
            req.session.userid = user.id 
            req.flash('message', 'Cadastro realizado com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })
            .catch((err) => console.error(err))
        })
    }
    static logout(req, res){
        req.session.destroy()
        res.redirect('/login')
    }
 }