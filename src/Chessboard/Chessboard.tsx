import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './Chessboard.module.scss'
import {
    createBoard,
    createCoordinates,
    getPositionObject,
    Theme
} from './helpers'

interface Props {
    position: string
    orientation: 'white' | 'black'
    pieces?: {}
    width: number | string
    theme: Theme | { light: string; dark: string }
    onDrop?: Function
    onSquareClick?: Function
    onSquareRightClick?: Function
}

const Chessboard: React.FC<Props> = (props) => {
    const [fen, setFen] = useState(getPositionObject(props.position))
    const [sourceSquare, setSourceSquare] = useState('')
    const [sourceTarget, setTargetSquare] = useState('')
    const [sourcePiece, setSourcePiece] = useState('')

    const coordinates = createCoordinates(props)
    return (
        <DndProvider backend={HTML5Backend}>
            <div
                className={styles.root}
                style={{ width: props.width, height: props.width }}
            >
                <div className={styles.numbers}>{coordinates.numbers}</div>
                <div className={styles.letters}>{coordinates.letters}</div>
                {createBoard(props)}
            </div>
        </DndProvider>
    )
}

export default Chessboard
