import { createUseStyles } from 'react-jss'
import Piece from '../components/Chessboard/Piece'
import Square from '../components/Chessboard/Square'
import { getPositionObject } from './fen'
import { Theme } from './theme'

const columns = 'abcdefgh'.split('')

const hasPiece = (currentPosition, square) =>
    currentPosition &&
    Object.keys(currentPosition) &&
    Object.keys(currentPosition).includes(square)

export const createBoard = ({
    position = 'start',
    orientation = 'white',
    theme
}) => {
    const currentPosition = getPositionObject(position)

    let row = orientation === 'black' ? 1 : 8
    let colorWhite = true
    const squares = []

    for (let r = 0; r < 8; r++) {
        row = orientation === 'black' ? row + 1 : row - 1

        for (let col = 0; col < 8; col++) {
            let square =
                orientation === 'black'
                    ? columns[7 - col] + (row - 1)
                    : columns[col] + (row + 1)

            if (col !== 0) {
                colorWhite = !colorWhite
            }
            squares.push(
                <Square
                    color={colorWhite ? theme.light : theme.dark}
                    key={square}
                >
                    {hasPiece(currentPosition, square) ? (
                        <Piece
                            piece={currentPosition[square]}
                            square={square}
                        />
                    ) : null}
                </Square>
            )
        }
    }
    return squares
}

const useStyles = createUseStyles({
    light: {
        color: (theme: Theme) => theme.light
    },
    dark: {
        color: (theme: Theme) => theme.dark
    }
})

export const Coordinates = (theme: Theme) => {
    const coordinates = {
        numbers: [],
        letters: []
    }

    const styles = useStyles(theme)

    for (let i = 0; i < 8; i++) {
        coordinates.numbers.push(
            <span key={i + 1} className={styles[i % 2 ? 'light' : 'dark']}>
                {i + 1}
            </span>
        )
        coordinates.letters.push(
            <span key={columns[i]} className={styles[i % 2 ? 'dark' : 'light']}>
                {columns[i]}
            </span>
        )
    }
    return coordinates
}
