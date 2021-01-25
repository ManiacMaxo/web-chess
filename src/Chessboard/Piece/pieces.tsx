import styles from './Piece.module.scss'

const pieces = {}
'wb'.split('').forEach((color) => {
    'KQBNRP'.split('').forEach((piece) => {
        pieces[color + piece] = (
            <div
                className={[styles.piece, styles[color + piece]].join(' ')}
            ></div>
        )
    })
})

export default pieces
