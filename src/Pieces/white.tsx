import styles from './pieces.module.scss'

export default {
    wK: () => (
        <img className={styles.piece} src={'/img/wk.png'} alt='white king' />
    ),
    wQ: () => (
        <img className={styles.piece} src={'/img/wq.png'} alt='white queen' />
    ),
    wB: () => (
        <img className={styles.piece} src={'/img/wb.png'} alt='white bishop' />
    ),
    wN: () => (
        <img className={styles.piece} src={'/img/wn.png'} alt='white knight' />
    ),
    wR: () => (
        <img className={styles.piece} src={'/img/wr.png'} alt='white rook' />
    ),
    wP: () => (
        <img className={styles.piece} src={'/img/wp.png'} alt='white pawn' />
    )
}
