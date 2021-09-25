import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { getNomeUsuario, getIdUsuario, getToken, logout } from '../../services/auth'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Perfil() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    const handleLimite = (texto) => {
        let textoLimite = texto.slice(0, 250)
        return textoLimite
    }

    async function handleDelete(id) {
        if (window.confirm("Deseja realmente deletar este artigo?")) {
            const response = await api.delete('/api/posts/' + id)
            if (response.data.status === 200) {
                window.location.href = '/perfil/' + getIdUsuario()
            } else {
                alert("Não foi possível excluir este artigo")
            }
        }
    }

    async function confirmSair() {
        if (window.confirm('Deseja realmente sair do sistema?')) {
            const response = await api.get('/api/usuarios/destroyToken', { headers: { token: getToken() } })
            if (response.status === 200) {
                logout()
                window.location.href = "/login"
            } else {
                alert("Não foi possível fazer logout")
            }
        }
    }

    useEffect(() => {
        async function getPostsUsuario() {
            const response = await api.get('/api/posts/' + getIdUsuario())
            setPosts(response.data)
            setLoading(false)
        }
        setTimeout(
            () => getPostsUsuario(), 1500
        )

    }, [])
    return (
        <>
            <nav>
                <header>
                    Olá, {getNomeUsuario()}!
                </header>
                <div id="links-perfil">
                    <a href={'/perfil/' + getIdUsuario() + '/atualizar'}>Editar perfil</a>
                    <a href={'/perfil/' + getIdUsuario() + '/escrever'}>Escrever</a>
                    <a><button onClick={confirmSair}>Sair</button></a>
                </div>
            </nav>
            <main>
                <h2>Aqui estão os seus artigos</h2>
                <div id="grid-cards">

                    {loading ? <div style={{ position: "absolute", width: "100vw", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></div> :
                        posts.map((post) => (
                            <div id="card-artigo-perfil">
                                <div id="main-artigo">
                                    <h3 id='titulo-artigo'>{post.titulo}</h3><br />
                                    <p id='conteudo-artigo'>{handleLimite(post.conteudo)}...</p><br />
                                </div>
                                <div id='div-button'>
                                    <a href={'/artigo/' + post._id}><button>Ler</button></a>
                                    <button onClick={() => handleDelete(post._id)}>Deleter</button>
                                    <button>Editar</button>
                                </div>
                            </div>
                        ))}

                </div>
            </main>
        </>
    )
}