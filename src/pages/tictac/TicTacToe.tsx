import React, {ReactElement} from "react";
import gameCss from './TicTacToe.module.css';

class Board extends React.Component<BoardProp, any> {
    render() {
        let props = this.props;
        return (
            <div>
                {this.createTable(props.rowCount, props.colCount)}
            </div>
        );
    }

    createTable(rowCount, colCount): ReactElement[] {
        let table: ReactElement[] = Array(rowCount);
        for (let i = 0; i < rowCount; i++) {
            table.push(this.renderRow(i, colCount));
        }
        return table;
    }

    renderRow(rowNum, colCount): ReactElement {
        let row: ReactElement[] = Array(colCount);
        for (let j = 0; j < colCount; j++) {
            let column = this.renderSquare((rowNum * colCount) + j);
            row.push(column);
        }
        return (
            <div className="board-row" key={rowNum}>
                {row}
            </div>
        );
    }

    renderSquare(i): ReactElement {
        return <
            this.Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

    Square(props: SquareProp) {
        return (
            <button className={gameCss.square} onClick={() => props.onClick()}>
                {props.value}
            </button>
        );
    }
}

class ContinueBtn extends React.Component<ContinueBtnProp, any> {
    render() {
        let props = this.props;
        return (
            <button
                hidden={!(props.winnerExist() || props.isTie())}
                onClick={() => props.startNewRound()}
            >
                <p>Start next round</p>
            </button>
        );
    }
}

class TicTacToe extends React.Component<GameProp, GameState> {
    constructor(props: GameProp) {
        super(props);
        let cookie = this.ensureCookie();
        this.state = this.initState(cookie.row, cookie.column);
    }

    render() {
        let winner = this.state.winner;
        let status = `${
            winner != null
                ? `Winner is ${winner}`
                : this.isTie()
                    ? "Draw Round"
                    : `Next player: ${this.getNextPlayer()}`
        }`;
        return (
            <div className={gameCss.game}>
                <div className="game-board">
                    <Board
                        squares={this.getCurrentArr()}
                        onClick={(idx) => this.handleClick(idx)}
                        rowCount={this.state.row}
                        colCount={this.state.col}
                    />
                </div>
                <div className={gameCss.gameInfo}>
                    <div>{status}</div>
                    <div>
                        <ContinueBtn
                            winnerExist={() => winner != null}
                            startNewRound={() => this.startNewRound()}
                            isTie={() => this.isTie()}
                        />
                    </div>
                    <ol>
                        <button onClick={() => this.toStep(this.state.step - 1)}>
                            backward
                        </button>
                        <button onClick={() => this.toStep(this.state.step + 1)}>
                            forward
                        </button>
                    </ol>
                </div>
            </div>
        );
    }

    ensureCookie(): GameCookie {
        if (document.cookie == null || document.cookie === "") {
            document.cookie = `${JSON.stringify({data: {Hello: "World", row: 3, column: 3}})};max-age=600`;
        }
        console.log(`cookie contents: ${document.cookie}`);
        return JSON.parse(document.cookie.split(";")[0]).data;
    }

    toStep(idx: number): void {
        let history = this.state.history;
        let range = history.length - 1;
        if (idx < 0 || idx > range) return;
        this.setState({
            step: idx,
            winner: this.calculateWinner(history[idx].arr)
        });
    }

    initState(rowCount: number, colCount: number): GameState {
        if (rowCount == null) rowCount = this.state.row;
        if (colCount == null) colCount = this.state.col;
        return {
            row: rowCount,
            col: colCount,
            history: [
                this.newHistory(Array(rowCount * colCount).fill(null))
            ],
            step: 0,
            winner: null
        }
    }

    newHistory(arr: string[]): StepHistory {
        return {arr: arr}
    }

    getCurrentArr(): string[] {
        return this.state.history[this.state.step].arr;
    }

    startNewRound(): void {
        this.setState(this.initState(null, null));
    }

    getNextPlayer(): string {
        return this.state.step % 2 === 0 ? "X" : "O";
    }

    handleClick(idx: number): void {
        if (this.state.winner != null) return;
        // prepare new history
        let arr = this.getCurrentArr().slice();
        if (arr[idx] != null) return;
        arr[idx] = this.getNextPlayer();
        let newHistory = this.newHistory(arr);
        // check step
        let history = this.state.history;
        let step = this.state.step;
        if (step < history.length - 1) {
            history = history.slice(0, step + 1);
        }
        // rerender
        this.setState({
            history: history.concat(newHistory),
            step: step + 1,
            winner: this.calculateWinner(arr)
        });
    }

    calculateWinner(squares: string[]): string {
        if (squares == null) return null;
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    isTie(): boolean {
        let arr = this.getCurrentArr();
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == null) return false;
        }
        return true;
    }
}

// ========================================

export default TicTacToe;


