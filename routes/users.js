const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const { storeReturnTo } = require('../utils/middleware');
const users = require('../controllers/users');

router.route('/register')
.get(users.renderRegister)
.post(catchAsync(users.createUser));

router.route('/login')
.get(users.renderLogin)
.post(storeReturnTo, passport.authenticate('local', {failureFlash: 'Usuario o contraseña incorrecta', failureRedirect: '/login'}), users.login);

router.get('/logout', users.logout); 
  

module.exports = router;