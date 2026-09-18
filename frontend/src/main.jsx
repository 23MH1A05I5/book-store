import axios from 'axios'
import './index.css'
import App from './App.jsx'

// Set global Axios Base URL for Render or Local
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
axios.defaults.baseURL = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
