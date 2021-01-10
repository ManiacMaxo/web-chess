import React, { useEffect, useState } from 'react'
import Chessboard from 'chessboardjsx'
import styles from './Chess.module.scss'
import white from '../Pieces/white'
import black from '../Pieces/black'
import evaluate from './evaluate_position'
import Chess from 'chess.js'
import { squareStyling } from './helper'

interface Props {}

class Theme {
    public light: React.CSSProperties
    public dark: React.CSSProperties

    constructor(light: string, dark: string) {
        this.light = { backgroundColor: light }
        this.dark = { backgroundColor: dark }
    }
}

const Game: React.FC<Props> = () => {
    const colors = {
        wb: new Theme('white', 'black'),
        green: new Theme('#EBECD1', '#779556'),
        blue: new Theme('#D9E4E7', '#7195AB')
    }
    const themes = [
        { label: 'White and Black', value: 'wb' },
        { label: 'Green', value: 'green' },
        { label: 'Blue', value: 'blue' }
    ]

    const [theme, setTheme] = useState(colors['blue'])
    const [value, setValue] = useState('blue')
    const [fen, setFen] = useState('start')
    const [squareStyles, setSquareStyles] = useState({})
    const [dropSquareStyle, setDropSquareStyle] = useState({})
    const [pieceSquare, setPieceSquare] = useState('')
    const [history, setHistory] = useState([])
    const [evaluation, setEvaluation] = useState('50%')
    const game = new Chess()

    useEffect(() => {
        const evaluation = evaluate(fen)
        setEvaluation((-evaluation * 50).toString() + '%')
    }, [fen])

    const onDrop = ({ sourceSquare, targetSquare }) => {
        // see if the move is legal
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q' // always promote to a queen for example simplicity
        })

        // illegal move
        if (move === null) return
        setFen(game.fen())
        setHistory(game.history({ verbose: true }))
        // setSquareStyles(squareStyling({ pieceSquare, history }))
        console.log(fen)
    }

    /* const onSquareRightClick = (square) => {
        setSquareStyles({
            [square]: { backgroundColor: 'rgba(255,99,71, 0.8)' }
        })
    }
    const removeHighlights = () => {
        setSquareStyles(squareStyling({ pieceSquare, history }))
    }

    const highlightSquare = (sourceSquare, squaresToHighlight) => {
        const highlightStyles = [sourceSquare, ...squaresToHighlight].reduce(
            (a, c) => {
                return {
                    ...a,
                    ...{
                        [c]: {
                            background: 'rgba(0,0,0,0.1)',
                            borderRadius: '50%',
                            width: '50%',
                            evaluation: '50%'
                        }
                    },
                    ...squareStyling({
                        history,
                        pieceSquare
                    })
                }
            },
            {}
        )
        setSquareStyles({ ...squareStyles, ...highlightStyles })
    }

    const onSquareClick = (square) => {
        removeHighlights()
        setSquareStyles(squareStyling({ pieceSquare: square, history }))
        setPieceSquare(square)

        const moves = game.moves({
            square: square,
            verbose: true
        })

        // exit if there are no moves available for this square
        if (moves.length === 0) return

        let squaresToHighlight = []
        moves.forEach((move) => squaresToHighlight.push(move.to))

        highlightSquare(square, squaresToHighlight)
    } */

    return (
        <div className={styles.root}>
            <header className={styles.header}>
                <h1>Chess By Victor</h1>
                <div className={styles.oponent}></div>
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
            <aside>
                <div className={styles.engine}>
                    <div
                        className={styles['black-eval']}
                        style={{ height: evaluation }}
                    ></div>
                    <div className={styles['white-eval']}></div>
                </div>
            </aside>
            <Chessboard
                lightSquareStyle={theme.light}
                darkSquareStyle={theme.dark}
                position={fen}
                pieces={{ ...white, ...black }}
                onDrop={onDrop}
                // squareStyles={squareStyles}
                // dropSquareStyle={dropSquareStyle}
                // onSquareClick={onSquareClick}
                // onSquareRightClick={onSquareRightClick}
                boardStyle={{ fontWeight: 'bold' }}
            />
            <footer className={styles.footer}></footer>
        </div>
    )
}

export default Game
