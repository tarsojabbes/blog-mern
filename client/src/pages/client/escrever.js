import React, { useState, useEffect } from 'react'
import api from '../../services/api'
import { getToken, getIdUsuario, getNomeUsuario } from '../../services/auth'

export default function Artigo() {

    const [titulo, setTitulo] = useState('')
    const [conteudo, setConteudo] = useState('')
    const [criador, setCriador] = useState('')
    const [visibility, setVisibility] = useState(false)
    const token = getToken()

    useEffect(() => {
        setCriador(getIdUsuario())

        function updateSize() {
            if (window.screen.width > 1200) {
                setVisibility(false)
            }
        }
        window.addEventListener('resize', updateSize);
        updateSize();
    }, [])

    async function handleSubmit() {
        if (titulo !== '' && conteudo !== '') {
            const response = await api.post('api/posts', { titulo, conteudo, criador })
            if (response.status === 200) {
                window.location.href = '/perfil/' + getIdUsuario()
            } else {
                alert("Não foi possível enviar o seu artigo")
            }
        } else {
            alert("Preencha todos os campos para enviar o seu artigo")
        }


    }

    return (
        <>
            <div id="navbar" class="navbar-artigo">
                <div id="tellme">
                    <a href="/"><p>TellMe</p></a>
                </div>
                <div id="links-landing-escrever">
                    <a href={token !== '' || token !== null || token !== undefined ? '/perfil/' + getIdUsuario() : '/login'} id="link">{token === '' || token === null || token === undefined ? 'Login' : 'Ir para o perfil'}</a>
                </div>
            </div>

            <main id="main-page-artigo">
                <header id="header-escrita-artigo">
                    <input id="titulo-escrita" value={titulo} name="titulo" placeholder="Título do artigo" onChange={(e) => setTitulo(e.target.value)} />
                    <p id="criador">Escrito por: <input disabled="true" id="criador" placeholder={getNomeUsuario()} /></p>

                </header>
                <article id="div-escrita-artigo">
                    <textarea value={conteudo} name="conteudo" placeholder="Conteúdo do artigo" onChange={(e) => setConteudo(e.target.value)} />
                </article>
                <button onClick={handleSubmit}>Enviar</button>
            </main>
        </>
    )
}