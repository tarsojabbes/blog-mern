import axios from 'axios'
const PORT = process.env.PORT || 5000
const api = axios.create({ baseURL: `http://127.0.0.1:${PORT}` })

export default api