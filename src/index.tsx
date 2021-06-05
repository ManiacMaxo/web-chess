import React from 'react'
import ReactDOM from 'react-dom'
import { JssProvider } from 'react-jss'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import './scss/index.scss'

ReactDOM.render(
    <React.StrictMode>
        <JssProvider id={{ minify: true }}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </JssProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
