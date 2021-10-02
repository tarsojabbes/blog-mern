const express = require('express')
const routes = express.Router()
const Usuario = require('./controllers/usuario.controller')
const Post = require('./controllers/post.controllers')
const path = require('path')

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    routes.use(express.static('client/build'));

    routes.get('*', (request, response) => {
        response.sendFile(path.resolve('../client/public', 'index.html'));
    });
}

// CRUD Usuários
routes.get('/api/usuarios', Usuario.index)
routes.get('/api/usuarios.details/:_id', Usuario.getUser)
routes.get('/api/usuarios/:email', Usuario.getId)
routes.post('/api/usuarios', Usuario.create)
routes.delete('/api/usuarios/:_id', Usuario.delete)
routes.put('/api/usuarios', Usuario.update)
routes.post('/api/usuarios/login', Usuario.login)
routes.get('/api/usuarios/checktoken', Usuario.token)
routes.get('/api/usuarios/destroytoken', Usuario.destroyToken)

// Crud Posts
routes.get('/api/posts', Post.index)
routes.get('/api/posts.details/:_id', Post.details)
routes.post('/api/posts', Post.create)
routes.delete('/api/posts/:_id', Post.delete)
routes.put('/api/posts', Post.update)
routes.get('/api/posts/:criador', Post.getPostsByIdUsuario)


module.exports = routes