const AuthController = require('../controllers/AuthController')
const AuthControllerPolicy = require('../policies/AuthControllerPolicy')

const isAuthenticated = require('../policies/isAuth')

module.exports = (app) => {
  app.post('/register',
    AuthControllerPolicy.register,
    AuthController.register)
  app.post('/login',
    AuthController.login)
}
