const express = require('express')
const routes = express.Router()
const Usuario = require('./controllers/usuario.controller')

routes.get('/', (req, res) => {
    res.send('Página Inicial')
})

routes.get('/api/usuarios', Usuario.index)
routes.post('/api/usuarios', Usuario.create)

module.exports = routes