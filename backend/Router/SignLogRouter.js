const {Signup, Login} = require('../Controller/SignLogController');
const {LoginValid, SignupValid} = require('../MiddleWare/AuthValidation');

const Router = require('express').Router();

Router.post('/signup', SignupValid, Signup);
Router.post('/login', LoginValid, Login);

module.exports = Router;