import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import api from '../../services/api'
import { getToken, getIdUsuario, getNomeUsuario } from '../../services/auth'

export default function Artigo() {

    const [titulo, setTitulo] = useState('')
    const [conteudo, setConteudo] = useState('')
    const [criador, setCriador] = useState('')
    const [_id, setId] = useState('')
    const { idArtigo } = useParams()
    const token = getToken()

    useEffect(() => {
        async function getPost() {
            const response = await api.get('/api/posts.details/' + idArtigo)
            setTitulo(response.data.titulo)
            setConteudo(response.data.conteudo)
            setId(response.data._id)
        }
        getPost()
        setCriador(getIdUsuario())
    }, [])

    async function handleUpdate() {
        if (titulo !== '' && conteudo !== '') {
            const res = await api.put('/api/posts', { _id, titulo, conteudo, criador })
            if (res.status === 200) {
                window.location.href = '/perfil/' + getIdUsuario()
            } else {
                alert("Não foi possível atualizar este artigo")
            }
        } else {
            alert("Por favor, preencha todos os campos")
        }
    }



    return (
        <>
            <div id="navbar" class="navbar-artigo">
                <div id="tellme">
                    <a href="/"><p>TellMe</p></a>
                </div>
                <div id="links-landing">
                    <a href={token !== '' || token !== null || token !== undefined ? '/perfil/' + getIdUsuario() : '/login'} id="link">{token == '' || token == null || token == undefined ? 'Login' : 'Ir para o perfil'}</a>
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
                <button onClick={handleUpdate}>Atualizar</button>
            </main>
        </>
    )
}