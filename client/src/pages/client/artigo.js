import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'

export default function Artigo() {

    const [post, setPost] = useState([])
    const { _id } = useParams()
    const [criador, setCriador] = useState('')

    useEffect(() => {
        async function getPost() {
            const response = await api.get('/api/posts.details/' + _id)
            setPost(response.data)
            const user = await api.get('/api/usuarios.details/' + response.data.criador)
            setCriador(user.data.nome)
        }
        getPost()
    }, [])

    return (
        <>
            <h1>{post.titulo}</h1>
            <p>{criador}</p>
            <p>{post.createdAt}</p>
            <p>{post.conteudo}</p>
        </>
    )
}