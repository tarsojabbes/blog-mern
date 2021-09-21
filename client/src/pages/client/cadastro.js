import React, { useState, useEffect } from 'react'
import api from '../../services/api'

export default function Cadastro() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [profissao, setProfissao] = useState('')

    async function handleCadastro() {
        const data = { nome, email, senha, profissao }
        const response = await api.post('/api/usuarios', data)
        if (response.status === 200) {
            setTimeout(() => {
                window.location.href = '/perfil'
            }, 3000)

        } else {
            alert("Não foi possível cadastrar este usuário")
        }
    }


    return (
        <div id="card-cadastro">
            <label>Nome completo</label>
            <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} />
            <label>Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Senha</label>
            <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} />
            <label>Profissão</label>
            <input type="text" required value={profissao} onChange={(e) => setProfissao(e.target.value)} />
            <button onClick={handleCadastro}>Cadastrar</button>
        </div>
    )
}