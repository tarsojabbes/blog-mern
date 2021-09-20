import React from 'react'

export default function App() {
    return (
        <>
            <div style={{ height: "100vh" }} id="landing-1">
                <div id="navbar">
                    <div id="tellme">
                        <p>TellMe</p>
                    </div>
                    <div id="links-landing">
                        <a href="#artigos" id="link">Artigos</a>
                        <a href="/login" id="link">Entrar</a>
                        <a href="/cadastrar"><button>Cadastre-se</button></a>
                    </div>
                </div>
                <div className="row" id="main-landing">
                    <div className="col">
                        <p id="slogan">Compartilhe<br /><strong style={{ fontWeight: "900" }}>IDEIAS,</strong><br />Semeie<br /><strong style={{ fontWeight: "900" }}>CONHECIMENTO.</strong></p>
                    </div>
                    <div className="col">
                        <p id="frase-landing">TellMe é a sua plataforma de artigos.<br />Aberta para as ideias dos nossos<br />escritores. Cadastre-se agora!</p>
                    </div>
                </div>
            </div>
            <div style={{ height: "100vh" }} id="artigos">
                <p>Artigos</p>
            </div>
        </>
    );
}