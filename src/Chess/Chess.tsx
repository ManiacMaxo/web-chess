import React, { useEffect, useState } from 'react'
import styles from './Chess.module.scss'
import Chess from 'chess.js'
import Chessboard, { Theme } from '../Chessboard'

interface Props {
    evaluate?: boolean
}

const Game: React.FC<Props> = (props) => {
    const colors = {
        wob: new Theme('white', 'black'),
        green: new Theme('#EBECD1', '#779556'),
        blue: new Theme('#D9E4E7', '#7195AB')
    }
    const themes = [
        { label: 'White and Black', value: 'wob' },
        { label: 'Green', value: 'green' },
        { label: 'Blue', value: 'blue' }
    ]

    const v = localStorage.getItem('value')
    const [value, setValue] = useState(v in colors ? v : 'blue')
    const [theme, setTheme] = useState(colors[value])

    const [fen, setFen] = useState('start')
    const [history, setHistory] = useState([])
    const [evaluation, setEvaluation] = useState('50%')
    const game = new Chess()

    const onDrop = ({ sourceSquare, targetSquare }) => {
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q'
        })
        if (move === null) return

        setFen(game.fen())
        setHistory(game.history({ verbose: true }))
    }

    const onSquareClick = (square) => {}

    const onSquareRightClick = (square) => {}

    useEffect(() => {
        localStorage.setItem('value', value)
    }, [value])

    // useEffect(() => {
    //     if (props.evaluate) {
    //         fetch('/api/eval', {
    //             body: JSON.stringify(fen)
    //         }).then((res) => {
    //             setEvaluation((-res * 50).toString() + '%')
    //         })
    //     }
    // }, [fen, props.evaluate])

    let engine = null
    if (props.evaluate) {
        engine = (
            <aside className={styles.engine}>
                <div
                    className={styles['black-eval']}
                    style={{ height: evaluation }}
                ></div>
                <div className={styles['white-eval']}></div>
            </aside>
        )
    }

    return (
        <div
            className={styles.root}
            style={{ gap: props.evaluate ? null : '5px 0' }}
        >
            <header className={styles.header}>
                <div className={styles.player}>
                    <img src='/img/bot.webp' alt='bot' />
                    <span>This is a bot</span>
                </div>
                <select
                    name='theme selector'
                    value={value}
                    onChange={(e) => {
                        setTheme(colors[e.target.value])
                        setValue(e.target.value)
                    }}
                >
                    {themes.map((theme) => (
                        <option key={theme.value} value={theme.value}>
                            {theme.label}
                        </option>
                    ))}
                </select>
            </header>
            {engine}
            <Chessboard
                position={fen}
                orientation='white'
                width='600px'
                onDrop={onDrop}
                onSquareClick={onSquareClick}
                onSquareRightClick={onSquareRightClick}
                theme={theme}
            />
            <footer className={styles.footer}>
                <div className={styles.player}>
                    <img src='/img/user.webp' alt='user' />
                    <span>This is you</span>
                </div>
            </footer>
        </div>
    )
}

export default Game
