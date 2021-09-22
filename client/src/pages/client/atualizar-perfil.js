import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import { useParams } from 'react-router'
import { setNomeUsuario } from '../../services/auth';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function AtualizarPerfil() {

    const { _id } = useParams()

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [profissao, setProfissao] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(
        () => {
            async function getUserById() {
                const response = await api.get('/api/usuarios.details/' + _id)
                setNome(response.data.nome)
                setEmail(response.data.email)
                setSenha(response.data.senha)
                setProfissao(response.data.profissao)
                setLoading(false)

            }
            getUserById()
        }
        , [_id])

    async function handleUpdate() {
        const data = { _id, nome, email, senha, profissao }
        if (nome !== '' && email !== '' && senha !== '' && profissao !== '') {
            const response = await api.put('/api/usuarios', data)
            if (response.status === 200) {
                setNomeUsuario(nome)
                window.location.href = '/perfil/' + _id
            } else {
                alert('Não foi possível atualizar o perfil')
            }
        } else {
            alert('Por favor preencha todos os dados para atualizar o perfil')
        }

    }
    return (
        <div id="background">
            <div id="div-btn-voltar">
                <a href="javascript:history.back()">
                    <img id="btn-voltar" alt="botão voltar" src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2018/png/iconmonstr-angel-left-circle-thin.png&r=255&g=255&b=255" />
                </a>
            </div>
            <p>Atualize sua conta TellMe</p>
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
                        <button onClick={handleUpdate} disabled={loading}>{loading ? <div style={{ transform: "scale(0.5)" }}><CircularProgress color="inherit" /></div> : "Atualizar"}</button>
                    </div>
                </div>
            </div>

        </div>
    )
}