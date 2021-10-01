import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../../services/api'
import { getToken, getIdUsuario } from '../../services/auth'

export default function App() {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [visibility, setVisibility] = useState(false)

    const handleLimite = (texto) => {
        let textoLimite = texto.slice(0, 500)
        return textoLimite
    }
    const token = getToken();

    useEffect(
        () => {
            async function getPosts() {
                const response = await api.get('/api/posts')
                setPosts(response.data)
                setLoading(false)
            }
            setTimeout(
                () => getPosts(), 1500
            )

            function updateSize() {
                if (window.screen.width > 1200) {
                    setVisibility(false)
                }
            }
            window.addEventListener('resize', updateSize);
            updateSize();



        }, [])
    return (
        <>
            <div style={{ height: "100vh" }} id="landing-1">
                <div id="navbar">
                    <div id="tellme">
                        <p>TellMe</p>
                    </div>
                    <div id="links-landing">
                        <a href="#artigos" id="link">Artigos</a>
                        <a href={token !== '' || token !== null || token !== undefined ? '/perfil/' + getIdUsuario() : '/login'} id="link">Entrar</a>
                        <a href="/cadastrar"><button>Cadastre-se</button></a>
                    </div>
                    <div id="dropdown">
                        <button onClick={() => setVisibility(!visibility)}><img src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2013/png/iconmonstr-menu-1.png&r=255&g=255&b=255" alt="menu" /></button>
                    </div>

                </div>
                {visibility ? (
                    <div id="links-landing-dropdown">
                        <a href="#artigos" id="link">Artigos</a>
                        <a href={token !== '' || token !== null || token !== undefined ? '/perfil/' + getIdUsuario() : '/login'} id="link">Entrar</a>
                        <a href="/cadastrar" id="link"><button>Cadastre-se</button></a>
                    </div>
                ) : ""}
                <div className="container container-fluid">
                    <div className="row" id="main-landing">
                        <div className="col">
                            <p id="slogan">Compartilhe<br /><strong style={{ fontWeight: "900" }}>IDEIAS,</strong><br />Semeie<br /><strong style={{ fontWeight: "900" }}>CONHECIMENTO.</strong></p>
                        </div>
                        <div className="col">
                            <p id="frase-landing">TellMe é a sua plataforma de artigos.<br />Aberta para as ideias dos nossos<br />escritores. Cadastre-se agora!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ minHeight: "100vh", maxHeight: "fit-content" }} id="artigos">
                <p id="h1-artigos">Artigos</p>
                <div id="grid-cards">
                    {loading ? <div style={{ position: "absolute", width: "100vw", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></div> : posts.map((post) => (
                        <div id="card-artigo">
                            <div id="main-artigo">
                                <h3 id='titulo-artigo'>{post.titulo}</h3><br />
                                <p id='conteudo-artigo'>{handleLimite(post.conteudo)}...</p><br />
                            </div>
                            <div id='div-button'>
                                <a href={'/artigo/' + post._id}><button>Continuar Lendo</button></a>
                            </div>
                        </div>
                    )
                    )}
                </div>
            </div>

        </>
    );
}