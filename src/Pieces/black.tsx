import styles from './pieces.module.scss'

export default {
    bK: () => (
        <img className={styles.piece} src={'/img/bk.png'} alt='black king' />
    ),
    bQ: () => (
        <img className={styles.piece} src={'/img/bq.png'} alt='black queen' />
    ),
    bB: () => (
        <img className={styles.piece} src={'/img/bb.png'} alt='black bishop' />
    ),
    bN: () => (
        <img className={styles.piece} src={'/img/bn.png'} alt='black knight' />
    ),
    bR: () => (
        <img className={styles.piece} src={'/img/br.png'} alt='black rook' />
    ),
    bP: () => (
        <img className={styles.piece} src={'/img/bp.png'} alt='black pawn' />
    )
}
