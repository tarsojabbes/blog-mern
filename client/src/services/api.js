import axios from 'axios'
const PORT = process.env.PORT || 5000
const api = axios.create({ baseURL: process.env.REACT_APP_API_URL })

export default api