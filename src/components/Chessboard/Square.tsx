import React from 'react'
import { useDrop } from 'react-dnd'
import { createUseStyles } from 'react-jss'

interface Props {
    color: string
}

const useStyles = createUseStyles({
    square: {
        backgroundColor: ({ color }: any) => color,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        boxShadow: ({ isOver }: any) =>
            isOver ? 'inset 3px 3px white, inset -3px -3px white' : null
    },
    active: {
        boxShadow: 'inset 3px 3px white, inset -3px -3px white'
    }
})

const Square: React.FC<Props> = (props) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'piece',
        drop: (piece) => console.log(piece),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    })

    const styles = useStyles({ color: props.color, isOver })

    return (
        <div
            ref={drop}
            className={styles.square}
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
