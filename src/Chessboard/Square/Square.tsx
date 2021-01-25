import React from 'react'
import { useDrop } from 'react-dnd'
import { Theme } from '../helpers'
import styles from './Square.module.scss'

interface Props {
    squareColor: 'white' | 'black'
    square: string
    setSquareCoordinates?: Function
    theme: Theme | { light: string; dark: string }
    onSquareClick?: Function
    wasSquareClicked?: Function
    onSquareRightClick?: Function
}

const Square: React.FC<Props> = (props) => {
    const onClick = () => {
        // props?.wasSquareClicked(true)
        // props?.onSquareClick(props.square)
    }

    const [{ isOver }, drop] = useDrop({
        accept: 'piece',
        drop: (piece) => console.log(piece),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    })

    return (
        <div
            ref={drop}
            key={props.square}
            className={styles.root}
            style={{
                backgroundColor:
                    props.squareColor === 'black'
                        ? props.theme.dark
                        : props.theme.light,
                border: isOver ? '3px solid white' : ''
            }}
            onClick={onClick}
            onContextMenu={(e) => {
                e.preventDefault()
                // props?.onSquareRightClick(props.square)
            }}
        >
            {props.children}
        </div>
    )
}

export default Square
