import { BrowserRouter, Switch, Route } from "react-router-dom";
import Artigo from './pages/client/artigo'
import AtualizarArtigo from './pages/client/atualizar-artigo'
import AtualizarPerfil from './pages/client/atualizar-perfil'
import Cadastro from './pages/client/cadastro'
import Escrever from './pages/client/escrever'
import Login from './pages/client/login'
import Perfil from './pages/client/perfil'
import Home from './pages/client/home'
import PrivateRoute from '../src/services/wAuth'

export default function Routes() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Home} />

                    <Route path='/artigo/:_id' exact component={Artigo} />

                    <PrivateRoute path='/perfil/:_id' exact component={Perfil} />
                    <PrivateRoute path='/perfil/:_id/artigo/atualizar/:idArtigo' exact component={AtualizarArtigo} />
                    <PrivateRoute path='/perfil/:_id/atualizar/' exact component={AtualizarPerfil} />
                    <PrivateRoute path='/perfil/:_id/escrever' exact component={Escrever} />

                    <Route path='/cadastrar' exact component={Cadastro} />
                    <Route path='/login' exact component={Login} />



                </Switch>
            </BrowserRouter>
        </>
    )
}