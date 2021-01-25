import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.scss'

interface Props {}

const Home: React.FC<Props> = () => {
    return (
        <h1>
            Hello there! Click <Link to='play'>here</Link> to play
        </h1>
    )
}

export default Home
