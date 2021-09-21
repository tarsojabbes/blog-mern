const { create, update } = require('../models/usuario.model.js')
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
    },
    async delete(req, res) {
        const { _id } = req.params
        const user = await Usuario.findByIdAndDelete({ _id })
        return res.json({ "Usuário removido": user })
    },
    async update(req, res) {
        const { _id, nome, email, senha, profissao } = req.body
        const data = { _id, nome, email, senha, profissao }
        const user = await Usuario.findOneAndUpdate({ _id }, data, { new: true })
        return res.json({ "Usuário atualizado": user })
        // Aqui a gente tem que voltar no Model para criar o mecanismo de encriptação de senha
        // quando o cadastro for atualizado
    },
    async getId(req, res) {
        const { email } = req.params
        const user = await Usuario.findOne({ email })
        return res.json(user)
    }
}