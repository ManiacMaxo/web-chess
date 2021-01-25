import React from 'react'
import { useDrag } from 'react-dnd'
import styles from './Piece.module.scss'

interface Props {
    piece: string
    pieces?: {}
    square: string
    getSquareCoordinates?: Function
    sourceSquare?: string
    targetSquare?: string
    onPieceClick?: Function
    allowDrag?: Function
    draggable?: boolean
}

const Piece: React.FC<Props> = (props) => {
    const [, drag] = useDrag({
        item: { id: props.piece, type: 'piece' },
        canDrag: () => true
    })

    return (
        <div
            // onClick={() => props.onPieceClick(props.piece)}
            ref={drag}
            key={props.piece}
            className={[styles.piece, styles[props.piece]].join(' ')}
        ></div>
    )
}

const pieceSource = {
    canDrag(props) {
        return (
            props.draggable &&
            props.allowDrag({ piece: props.piece, sourceSquare: props.square })
        )
    },
    beginDrag(props) {
        return {
            piece: props.piece,
            source: props.square,
            board: props.id
        }
    },
    endDrag(props, monitor) {
        const {
            setPosition,
            piece,
            square,
            onDrop,
            wasManuallyDropped,
            wasSquareClicked
        } = props
        const dropResults = monitor.getDropResult()
        const didDrop = monitor.didDrop()

        const board = monitor.getItem().board
        const dropBoard = dropResults && dropResults.board

        // check if target board is source board
        if (board === dropBoard && didDrop) {
            if (onDrop.length) {
                wasManuallyDropped(true)
                if (square !== 'spare') {
                    wasSquareClicked(false)
                }

                // execute user's logic
                return onDrop({
                    sourceSquare: square,
                    targetSquare: dropResults.target,
                    piece
                })
            }
            // set new position
            setPosition({
                sourceSquare: square,
                targetSquare: dropResults.target,
                piece
            })
        }
    }
}

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
        dropTarget: monitor.getDropResult()
    }
}

// export default DragSource('piece', pieceSource, collect)(Piece)
export default Piece
