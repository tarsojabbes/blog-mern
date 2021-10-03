import axios from 'axios'
const PORT = process.env.PORT || 5000
const api = axios.create({ baseURL: `http://localhost:${PORT}` })

export default api