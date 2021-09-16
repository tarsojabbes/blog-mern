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

DataSchema.pre('save', async function (next) {
    if (!this.isModified("senha")) {
        return next()
    }
    this.senha = await bcrypt.hashSync(this.senha_usuario, 10)
    next()
})

const usuarios = mongoose.Model("Usuarios", DataSchema)
module.exports = usuarios
