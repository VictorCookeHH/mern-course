import 'react-toastify/dist/ReactToastify.css'
import './index.css'

import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <ToastContainer position="top-center" />
  </>
)
