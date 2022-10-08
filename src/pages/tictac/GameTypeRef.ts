/* eslint-disable @typescript-eslint/no-unused-vars */
type GameCookie = {
    row: number,
    column: number
}

type GameState = {
    col?: number,
    row?: number,
    history?: StepHistory[],
    step: number,
    winner?: string
}

type StepHistory = {
    arr: string[]
}

type SquareProp = {
    key: number,
    value: string,
    onClick: Function
}

type ContinueBtnProp = {
    winnerExist: Function,
    isTie: Function,
    startNewRound: Function
}

type GameProp = {}

type BoardProp = {
    squares: string[],
    onClick: Function,
    rowCount: number,
    colCount: number
}