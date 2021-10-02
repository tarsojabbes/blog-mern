const express = require('express')
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express()
const routes = require('./src/routes')
const { LOCAL_ADDRESS = '0.0.0.0' } = process.env

const PORT = process.env.PORT || 5000

mongoose.connect('mongodb+srv://root:050386999@cluster0.cqr2w.mongodb.net/blog-mern?retryWrites=true&w=majority', (err) => {
    if (err) {
        console.log(err)
    }
    console.log(">> MongoDB conectado com sucesso")
})

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(routes)

app.listen(PORT, LOCAL_ADDRESS, () => {
    console.log('>> Servidor está rodando')
})
