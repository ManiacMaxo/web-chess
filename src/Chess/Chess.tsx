import Chess from 'chess.js'
import React, { useEffect, useState } from 'react'
import { MdRotateRight } from 'react-icons/md'
import { Chessboard } from '../components'
import { Theme } from '../helpers'
import styles from './Chess.module.scss'

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

    const [value, setValue] = useState(
        localStorage.getItem('theme') in colors
            ? localStorage.getItem('theme')
            : 'blue'
    )
    const [theme, setTheme] = useState(colors[value])

    const [fen, setFen] = useState('start')
    const [orientation, setOrientation] = useState<'white' | 'black'>('white')
    const [history, setHistory] = useState([])
    const [evaluation, setEvaluation] = useState('50%')
    const game = new Chess()

    const bot = (
        <div className={styles.player}>
            <img src='/img/bot.webp' alt='bot' />
            <span>This is a bot</span>
        </div>
    )

    const player = (
        <div className={styles.player}>
            <img src='/img/user.webp' alt='user' />
            <span>This is you</span>
        </div>
    )

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

    const rotateBoard = () =>
        setOrientation((prev) => (prev === 'white' ? 'black' : 'white'))

    useEffect(() => {
        localStorage.setItem('theme', value)
    }, [value])

    return (
        <div
            className={styles.root}
            style={{ gap: props.evaluate ? '10px 5px' : '5px 0' }}
        >
            <header className={styles.header}>
                {orientation === 'white' ? bot : player}
                <div>
                    <button onClick={rotateBoard}>
                        <MdRotateRight />
                    </button>

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
                </div>
            </header>
            {props.evaluate && (
                <aside className={styles.engine}>
                    <div
                        className={styles['black-eval']}
                        style={{ height: evaluation }}
                    />
                    <div className={styles['white-eval']} />
                </aside>
            )}
            <Chessboard
                position={fen}
                orientation={orientation}
                width='650px'
                theme={theme}
                onDrop={onDrop}
                onSquareClick={onSquareClick}
                onSquareRightClick={onSquareRightClick}
            />
            <footer className={styles.footer}>
                {orientation === 'white' ? player : bot}
            </footer>
        </div>
    )
}

export default Game
