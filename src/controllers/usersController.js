const { loadUsers, storeUsers } = require('../data/db')
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')

module.exports = {
    register: (req, res) => {
        res.render('register')
    },
    processRegister: (req, res) => {
      let  errors = validationResult(req)
        if (errors.isEmpty()) {
            const { name, usuario, email, domicilio, password } = req.body;
            let users = loadUsers()

            let newUsers = {
                id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
                name: name.trim(),
                usuario: usuario.trim(),
                email: email.trim(),
                domicilio: domicilio.trim(),
                password: bcryptjs.hashSync(password, 10)
            }

            let userModify = [...users, newUsers];
            storeUsers(userModify)

            return res.redirect('login')
        }
        else {
            return res.render('register', { errors: errors.mapped(), old: req.body })
        }
    },
    login: (req, res) => {
        res.render('login')
    },
    processLogin: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()){
           res.redirect('/products/create')
        } else {
          return res.render('login', {errors: errors.mapped()})
        }
    }
}