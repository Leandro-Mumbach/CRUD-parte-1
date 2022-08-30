var express = require('express');
var router = express.Router();

const{login, register, processRegister, processLogin}=require('../controllers/usersController');
const registerValidation = require("../validations/registerValidation")
const loginValidation = require("../validations/loginValidation")

router
  .get('/register', register)
  .post('/register', registerValidation , processRegister)
  .get('/login',login)
  .post('/login', loginValidation, processLogin)

module.exports = router;




