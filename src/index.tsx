import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/index.scss'
import Play from './Play/Play'

const Home = React.lazy(() => import('./Home/Home'))

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Suspense fallback='loading...'>
                        <Home />
                    </Suspense>
                </Route>
                <Route exact path='/play'>
                    <Suspense fallback='loading...'>
                        <Play />
                    </Suspense>
                </Route>
                <Route path='/' render={() => <div>404</div>}></Route>
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
