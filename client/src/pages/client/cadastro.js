import React, { useState } from 'react'
import api from '../../services/api'
import CircularProgress from '@material-ui/core/CircularProgress';
import { login, setIdUsuario, setNomeUsuario } from '../../services/auth'

export default function Cadastro() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [profissao, setProfissao] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleLogin() {
        setLoading(true)
        if (email !== '' && senha !== '') {
            await api.post('/api/usuarios/login', { email, senha })
                .then((res) => {
                    if (res.status === 200) {
                        if (res.data.status === 1) {
                            login(res.data.token)
                            setIdUsuario(res.data.id_client)
                            setNomeUsuario(res.data.user_name)
                            setTimeout(() => {
                                async function getId(email) {
                                    const resultado = await api.get('/api/usuarios/' + email)
                                    window.location.href = '/perfil/' + resultado.data._id
                                    setLoading(false)

                                }
                                getId(email)
                                setLoading(false)

                            }, 2000)

                        } else if (res.data.status === 2) {
                            alert('Email ou senha informados estão incorretos')
                            setLoading(false)
                        }
                    } else {
                        alert("Email não encontrado")
                        setLoading(false)
                    }

                })
        } else {
            alert("Preencha todos os dados para efetuar login")
            setLoading(false)
        }
    }

    async function handleCadastro() {
        setLoading(true)
        const data = { nome, email, senha, profissao }
        if (nome !== '' && email !== '' && senha !== '' && profissao !== '') {
            const response = await api.post('/api/usuarios', data)
            if (response.status === 200) {

                handleLogin()
            } else {
                alert("Não foi possível cadastrar este usuário")
                setLoading(false)
            }
        } else {
            setLoading(false)
            alert("Preencha todos os dados do formulário de cadastro")
        }

    }




    return (
        <div id="background">
            <p>Cadastre-se no TellMe</p>
            <div id="card-cadastro">
                <div id="form">
                    <label>Nome completo</label>
                    <input type="text" required value={nome} onChange={(e) => setNome(e.target.value)} />
                    <label>Email</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Senha</label>
                    <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <label>Profissão</label>
                    <input type="text" required value={profissao} onChange={(e) => setProfissao(e.target.value)} />
                    <div id="div-button">
                        <button onClick={handleCadastro} disabled={loading}>{loading ? <div style={{ transform: "scale(0.5)" }}><CircularProgress color="inherit" /></div> : "Cadastrar"}</button>
                    </div>
                </div>
            </div>
            <div id="call-login">
                <p>Já possui uma conta TellMe? <a href="/login">Entre agora</a></p>
            </div>
        </div>
    )
}