import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './Chessboard.module.scss'
import { Coordinates, createBoard, Theme } from '../../helpers'

interface Props {
    position?: string
    theme: Theme | { light: string; dark: string }
    orientation?: 'white' | 'black'
    pieces?: {}
    width?: number | string
    onDrop?: Function
    onSquareClick?: Function
    onSquareRightClick?: Function
}

const Chessboard: React.FC<Props> = (props) => {
    // const [fen, setFen] = useState(getPositionObject(props.position))
    // const [sourceSquare, setSourceSquare] = useState('')
    // const [sourceTarget, setTargetSquare] = useState('')
    // const [sourcePiece, setSourcePiece] = useState('')

    const coordinates = Coordinates(props.theme)
    const board = createBoard(props)
    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.root} style={{ width: props.width }}>
                <div className={styles.numbers}>{coordinates.numbers}</div>
                <div className={styles.letters}>{coordinates.letters}</div>
                <div className={styles.board}>{board}</div>
            </div>
        </DndProvider>
    )
}

Chessboard.defaultProps = {
    position: 'start',
    orientation: 'white',
    width: '600px'
}

export { Chessboard }
