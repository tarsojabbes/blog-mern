import React from 'react'
import api from '../../services/api'
import { getNomeUsuario, getIdUsuario } from '../../services/auth'

export default function Perfil() {
    return (
        <>
            <nav>
                <header>
                    Olá, {getNomeUsuario()}!
                </header>
                <div id="links-perfil">
                    <a href={'/perfil/' + getIdUsuario() + '/atualizar'}>Editar perfil</a>
                    <a href={'/perfil/' + getIdUsuario() + '/escrever'}>Escrever</a>
                    <a>Sair</a>
                </div>
            </nav>
            <main>
                <h2>Aqui estão os seus artigos</h2>
                <div id="grid-cards">
                    {/* O map começa a partir daqui */}
                    <div id="card-artigo-perfil">
                        <div id="main-artigo">
                            <h3 id='titulo-artigo'>Titulo</h3><br />
                            <p id='conteudo-artigo'>Conteudo</p><br />
                        </div>
                        <div id='div-button'>
                            <a href={'/artigo/'}><button>Ler</button></a>
                            <a href={'/artigo/'}><button>Deleter</button></a>
                            <a href={'/artigo/'}><button>Editar</button></a>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}