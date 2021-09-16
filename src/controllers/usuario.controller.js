const { create } = require('../models/usuario.model.js')
const Usuario = require('../models/usuario.model.js')

module.exports = {
    async index(req, res) {
        const user = await Usuario.find()
        res.json(user)
    },
    async create(req, res) {
        const { nome, email, senha, profissao } = req.body

        let data = {}
        let user = await Usuario.findOne({ email })
        if (!user) {
            data = { nome, email, senha, profissao }
            user = await Usuario.create(data);
            return res.status(200).json(user)
        } else {
            return res.status(500).json(user)
        }
    }
}