const express = require('express')
const routes = express.Router()
const Usuario = require('./controllers/usuario.controller')
const Post = require('./controllers/post.controllers')

routes.get('/', (req, res) => {
    res.send('Página Inicial')
})

// CRUD Usuários
routes.get('/api/usuarios', Usuario.index)
routes.post('/api/usuarios', Usuario.create)
routes.delete('/api/usuarios/:_id', Usuario.delete)
routes.put('/api/usuarios', Usuario.update)

// Crud Posts
routes.get('/api/posts', Post.index)
routes.post('/api/posts', Post.create)
routes.delete('/api/posts/:_id', Post.delete)
routes.put('/api/posts', Post.update)

module.exports = routes