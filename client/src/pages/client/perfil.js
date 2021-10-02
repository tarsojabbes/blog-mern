import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { getNomeUsuario, getIdUsuario, getToken, logout } from '../../services/auth'
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Perfil() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [visibility, setVisibility] = useState(false)
    const [nome, setNome] = useState('')

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

        function updateSize() {
            if (window.screen.width > 1200) {
                setVisibility(false)
            }
        }
        window.addEventListener('resize', updateSize);
        updateSize();

        function nomeReduzido(nome) {
            let nomeRed = getNomeUsuario().split(' ')
            setNome(nomeRed[0])

        }
        nomeReduzido(getNomeUsuario())



    }, [])
    return (
        <>
            <nav>
                <header>
                    Olá, {nome}!
                </header>
                <div id="links-perfil">
                    <a href={'/perfil/' + getIdUsuario() + '/atualizar'}>Editar perfil</a>
                    <a href={'/perfil/' + getIdUsuario() + '/escrever'}>Escrever</a>
                    <a><button onClick={confirmSair}>Sair</button></a>
                </div>
                <div id="dropdown">
                    <button onClick={() => setVisibility(!visibility)}><img src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-menu-1.png&r=14&g=124&b=217" alt="menu" /></button>
                </div>
            </nav>
            {visibility ? (
                <div id="links-perfil-dropdown">
                    <a id="link" href={'/perfil/' + getIdUsuario() + '/atualizar'}>Editar perfil</a>
                    <a id="link" href={'/perfil/' + getIdUsuario() + '/escrever'}>Escrever</a>
                    <a id="link"><button onClick={confirmSair}>Sair</button></a>
                </div>
            ) : ""}
            <main>
                <h2>Aqui estão os seus artigos</h2>
                <div id="grid-cards">

                    {loading ? <div style={{ position: "absolute", width: "100vw", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></div> :
                        posts.map((post, id) => (
                            <div id="card-artigo-perfil" key={id}>
                                <div id="main-artigo">
                                    <h3 id='titulo-artigo'>{post.titulo}</h3><br />
                                    <p id='conteudo-artigo'>{handleLimite(post.conteudo)}...</p><br />
                                </div>
                                <div id='div-button'>
                                    <a href={'/artigo/' + post._id}><button>Ler</button></a>
                                    <button onClick={() => handleDelete(post._id)}>Deleter</button>
                                    <a href={'/perfil/' + getIdUsuario() + '/artigo/atualizar/' + post._id}><button>Editar</button></a>
                                </div>
                            </div>
                        ))}

                </div>
            </main>
        </>
    )
}