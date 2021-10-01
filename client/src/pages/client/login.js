import React, { useState } from 'react'
import api from '../../services/api'
import CircularProgress from '@material-ui/core/CircularProgress';
import { login, setIdUsuario, setNomeUsuario } from '../../services/auth'

export default function Login() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
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


    return (
        <div id="background">
            <div id="div-btn-voltar">
                <a href="javascript:history.back()">
                    <img id="btn-voltar" alt="botão voltar" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2018/png/iconmonstr-angel-left-circle-thin.png&r=255&g=255&b=255" />
                </a>
            </div>
            <p>Entre no TellMe</p>
            <div id="card-cadastro-login" >
                <div id="form">
                    <label>Email</label>
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Senha</label>
                    <input type="password" required value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <div id="div-button">
                        <button onClick={handleLogin} disabled={loading}>{loading ? <div style={{ transform: "scale(0.5)" }}><CircularProgress color="inherit" /></div> : "Entrar"}</button>
                    </div>
                </div>
            </div>
            <div id="call-login">
                <p>Não possui uma conta TellMe? <a href="/cadastrar">Cadastre-se agora</a></p>
            </div>
        </div>
    )
}