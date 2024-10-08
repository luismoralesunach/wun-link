import React from 'react'
import store from './redux/store.js'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>

  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </Provider>
)
