import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import { getToken, getIdUsuario } from '../../services/auth'

export default function Artigo() {

    const [post, setPost] = useState([])
    const { _id } = useParams()
    const [criador, setCriador] = useState('')

    const token = getToken()

    useEffect(() => {
        async function getPost() {
            const response = await api.get('/api/posts.details/' + _id)
            setPost(response.data)
            const user = await api.get('/api/usuarios.details/' + response.data.criador)
            setCriador(user.data.nome)
        }
        getPost()
    }, [_id])

    return (
        <>
            <div id="navbar" class="navbar-artigo">
                <div id="tellme">
                    <a href="/"><p>TellMe</p></a>
                </div>
                <div id="links-landing">
                    <a href="/#artigos" id="link">Artigos</a>
                    <a href={token !== '' || token !== null || token !== undefined ? '/perfil/' + getIdUsuario() : '/login'} id="link">{token === '' || token === null || token === undefined ? 'Login' : 'Ir para o perfil'}</a>
                    <a href="/cadastrar" style={token === '' || token === null || token === undefined ? { display: "inherit" } : { display: "none" }}><button id="cadastro" style={token === '' || token === null || token === undefined ? { display: "" } : { display: "none" }}>Cadastre-se</button></a>
                </div>
            </div>
            <main id="main-page-artigo">
                <header id="header">
                    <h1 id="titulo">{post.titulo}</h1>
                    <p id="criador">Este artigo foi escrito por: {criador}</p>
                    <p id="data">Criado em: {new Date(post.createdAt).toLocaleString('pt-br')}</p>
                </header>
                <article id="div">
                    <p id="conteudo">{post.conteudo}</p>
                </article>
            </main>
        </>
    )
}