import React from 'react'
import { createUseStyles } from 'react-jss'

interface Props {
    piece: string
    square: string
    sourceSquare?: string
    targetSquare?: string
    draggable?: boolean
}

const useStyles = createUseStyles({
    piece: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        backgroundSize: '100%',
        zIndex: 5,
        backgroundImage: ({ piece }: any) => `url('/img/${piece}.png')`
    }
})

const Piece: React.FC<Props> = (props) => {
    const styles = useStyles({ piece: props.piece })

    return <div key={props.piece} className={styles.piece} />
}

export default Piece
