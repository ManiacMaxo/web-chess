import React from 'react'
import { getPositionObject } from './fen'
import Square from '../Square/Square'
import Piece from '../Piece'

const columns = 'abcdefgh'.split('')

const hasPiece = (currentPosition, square) =>
    currentPosition &&
    Object.keys(currentPosition) &&
    Object.keys(currentPosition).includes(square)

export const createBoard = (props) => {
    const currentPosition = getPositionObject(props.position)

    let row = props.orientation === 'black' ? 1 : 8
    let color = 'white'
    const squares = []

    for (let r = 0; r < 8; r++) {
        row = props.orientation === 'black' ? row + 1 : row - 1
        for (let col = 0; col < 8; col++) {
            let square =
                props.orientation === 'black'
                    ? columns[7 - col] + (row + 1)
                    : columns[col] + (row + 1)
            if (col !== 0) {
                color = color === 'black' ? 'white' : 'black'
            }
            squares.push(
                <Square
                    theme={props.theme}
                    squareColor={color === 'black' ? 'black' : 'white'}
                    square={square}
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

export const createCoordinates = (props) => {
    const coordinates = {
        numbers: [],
        letters: []
    }

    let color = 'light'

    for (let i = 0; i < 8; i++) {
        coordinates.numbers.push(
            <span
                key={i + 1}
                style={{
                    color:
                        color === 'dark' ? props.theme.light : props.theme.dark
                }}
            >
                {i + 1}
            </span>
        )
        coordinates.letters.push(
            <span
                key={columns[i]}
                style={{
                    color:
                        color === 'dark' ? props.theme.dark : props.theme.light
                }}
            >
                {columns[i]}
            </span>
        )
        color = color === 'dark' ? 'light' : 'dark'
    }
    return coordinates
}
