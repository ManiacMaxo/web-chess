import React from 'react'
import Chess from '../Chess/Chess'
import styles from './Home.module.scss'

interface Props {}

const Home: React.FC<Props> = () => {
    return (
        <>
            <Chess />
        </>
    )
}

export default Home
