import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

interface Props {}

const Home = React.lazy(() => import('./pages/Home'))
const Play = React.lazy(() => import('./pages/Play'))

const App: React.FC<Props> = (props) => {
    return (
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
    )
}

export default App
