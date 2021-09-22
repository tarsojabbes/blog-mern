const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    titulo: String,
    conteudo: String,
    criador: String
}, {
    timestamps: true
})


const posts = mongoose.model('Posts', DataSchema)
module.exports = posts