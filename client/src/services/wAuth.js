import React, { useEffect, useState } from 'react'
import api from './api'
import { login, logout, getToken } from './auth'
import { Route, Redirect } from 'react-router-dom'

export default function wAuth({ component: Component, ...rest }) {

    const [redirect, setRedirect] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function verify() {
            const response = await api.get('/api/usuarios/checktoken', { params: { token: getToken() } })
            if (response.data.status === 200) {
                setLoading(false)
                setRedirect(false)
            } else {
                logout()
                setLoading(false)
                setRedirect(true)
            }
        }
        verify()
    }, [])
    return (
        <>
            {loading ? 'Carregando' : <Route {...rest}
                render={props => !redirect ? <Component {...props} /> : <Redirect to={{ pathname: "/login", state: { from: props.location } }} />}
            />}
        </>
    )
}