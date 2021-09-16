const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const DataSchema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String,
    profissao: String,
}, {
    timestamps: true
})

const usuarios = mongoose.Model("Usuarios", DataSchema)
module.exports = usuarios
