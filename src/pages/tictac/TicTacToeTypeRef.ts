/* eslint-disable @typescript-eslint/no-unused-vars */
type GameCookie = {
    row: number,
    column: number
}

type GameState = {
    col: number,
    row: number,
    history: StepHistory[],
    step: number,
    winner: string | null
}

type StepHistory = {
    arr: (string | null)[]
}

type SquareProp = {
    key: number,
    value: string | null,
    onClick: () => void
}

type ContinueBtnProp = {
    winnerExist: () => boolean,
    isTie: () => boolean,
    startNewRound: () => void
}

type ContinueBtnState = Record<string, never>;

type GameProp = Record<string, never>;

type BoardProp = {
    squares: (string | null)[],
    onClick: (idx: number) => void,
    rowCount: number,
    colCount: number
}

type BoardState = Record<string, never>;