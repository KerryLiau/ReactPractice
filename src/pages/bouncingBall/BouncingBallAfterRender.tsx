import React from "react";
import gameCss from "./BouncingBall.module.css";
import Ball from "./entities/Ball";
import MathTool from "../../tool/MathTool";
import StrTool from "../../tool/StrTool";
import EvilCircle from "./entities/EvilCircle";
import {CircleShape} from "./entities/base/BaseEntities";
import {SingletonScheduler} from "../../tool/SchedulerTool";

type BouncingBallProps = Record<string, never>;

type BouncingBallState = {
    remainCount: number
}

class BouncingBall extends React.Component<BouncingBallProps, BouncingBallState> {
    private readonly width: number;
    private readonly height: number;
    private readonly ballCount: number;
    private readonly timeSecMultiplier: number;
    private canvas: HTMLCanvasElement;
    private isInit: boolean;
    private balls: Ball[];
    private evils: EvilCircle[];
    public timer: Timer;
    public playAgainBtn: PlayAgainBtn;

    constructor(props: BouncingBallProps) {
        super(props);
        this.isInit = true;
        this.timeSecMultiplier = 3;  // 25 球 × 3 = 75 秒
        this.ballCount = 25;
        // 響應式場地大小：使用視窗的 85%，但設定最大/最小值避免跑版
        this.width = Math.min(Math.max(window.innerWidth * 0.85, 600), 1400);
        this.height = Math.min(Math.max(window.innerHeight * 0.75, 500), 900);
        this.state = this.newState();
        this.init();
    }

    render() {
        return (
            <div>
                <h1 className={gameCss.gameTitle}>bouncing balls</h1>
                <ScoreBoard
                    ballCount={this.ballCount}
                    getRemainCount={() => {
                        return this.state.remainCount;
                    }}
                    gameOver={() => this.gameOver()}
                />
                <Timer
                    parent={this}
                    isWin={() => this.allClear()}
                    roundTimeLimit={this.ballCount * this.timeSecMultiplier}
                />
                <PlayAgainBtn
                    parent={this}
                    onclick={() => this.playAgain()}
                    mustHide={() => {
                        let allClear = this.allClear();
                        return this.isInit || (!this.gameOver() && !allClear);
                    }}
                />
                <StaminaBar
                    target={this.evils[0]}
                />
                <canvas className={gameCss.test}/>
            </div>
        );
    }

    componentDidMount() {
        this.canvas = document.querySelector(`.${gameCss.test}`) as HTMLCanvasElement;
        this.drawCanvas(this.canvas);
    }

    private newState(): BouncingBallState {
        return {
            remainCount: this.ballCount
        }
    }

    private allClear(): boolean {
        for (const ball of this.balls) {
            if (ball.isAlive) return false;
        }
        return true;
    }

    private gameOver(): boolean {
        let allClear = this.allClear();
        let noMoreTime = this.timer == null ? true : this.timer.remainSec() === 0;
        return !allClear && noMoreTime;
    }

    private init(): void {
        this.balls = this.initBalls();
        this.evils = this.initEvils();
        this.isInit = false;
    }

    private playAgain(): void {
        // set isInit as true, let PlayAgainBtn hidden in first render
        this.isInit = true;
        this.setState(
            this.newState(),
            () => {
                // the second param in setState() is function,
                // will be call when setState() is ended
                this.init();
                this.drawCanvas(this.canvas);
                this.timer.reset();
                this.playAgainBtn.adjustVisibility();
            });
    }

    private drawCanvas(canvas: HTMLCanvasElement): void {
        canvas.width = this.width;
        canvas.height = this.height;
        const ctx = canvas.getContext("2d");
        this.animateLoop(ctx);
    }

    private animateLoop(ctx: CanvasRenderingContext2D): void {
        let count = [15];
        const render = () => {
            if (this.mustStopAnime(count)) {
                return;
            }
            this.fillBackground(ctx);
            this.bouncingBallMovement(ctx);
            this.evilCircleMovement(ctx);
            window.requestAnimationFrame(render);
        };
        render();
    }

    private mustStopAnime(count: number[]): boolean {
        // stop anime when game over or win
        if (this.gameOver()) {
            this.playAgainBtn.adjustVisibility();
            return true;
        } else if (this.allClear()) {
            // remain frames to ensure canvas is clean
            if (count[0] > 0) count[0]--;
            else {
                this.playAgainBtn.adjustVisibility();
                return true;
            }
        }
        return false;
    }

    private fillBackground(ctx: CanvasRenderingContext2D): void {
        // fill background, perform afterimage effects
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
        ctx.fillRect(0, 0, this.width, this.height);
    }

    private bouncingBallMovement(ctx: CanvasRenderingContext2D): void {
        for (let ball of this.balls) {
            if (!ball.isAlive) continue;
            this.drawArc(ctx, ball);
            ball.update(this.width, this.height);
            if (!ball.collisionDetected(this.balls)) continue;
            this.handleBallCollide(ball);
        }
    }

    private evilCircleMovement(ctx: CanvasRenderingContext2D): void {
        for (let evil of this.evils) {
            this.drawStroke(ctx, evil);
            evil.update(this.width, this.height);
            const target = evil.collisionDetected(this.balls);
            if (target == null) continue;
            this.handleEvilCollide(evil, target as Ball);
        }
    }

    private randomRGB(): string {
        const ran = MathTool.ranInt;
        return StrTool.format("rgb({0},{1},{2})", ran(0, 255), ran(0, 255), ran(0, 255));
    }

    private handleBallCollide(ball: Ball) {
        ball.color = this.randomRGB();
    }

    private handleEvilCollide(self: EvilCircle, ball: Ball) {
        ball.isAlive = false;
        this.setState({
            remainCount: this.state.remainCount - 1
        });
        if (!this.allClear()) {
            // 設定最小大小為 1，避免 EvilCircle 消失
            self.size = Math.max(self.size - 1, 1);
        }
    }

    private drawArc(ctx: CanvasRenderingContext2D, circle: CircleShape) {
        ctx.fillStyle = circle.color;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
        ctx.fill();
    }

    private drawStroke(ctx: CanvasRenderingContext2D, circle: CircleShape) {
        ctx.strokeStyle = circle.color;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
        ctx.lineWidth = 5;
        ctx.stroke();
    }

    private initBalls = (): Ball[] => {
        const arr: Ball[] = [];
        for (let i = 0; i < this.ballCount; i++) {
            const ball = new Ball();
            let ran = MathTool.ranInt;
            let x = ran(0, this.width), y = ran(0, this.height);
            while (ball.collisionDetected(arr)) {
                x = ran(0, this.width);
                y = ran(0, this.height);
            }
            ball.x = x;
            ball.y = y;
            ball.velX = ran(-7, 7);
            ball.velY = ran(-7, 7);
            ball.size = ran(0, 10) + 10;
            ball.color = this.randomRGB();
            arr.push(ball);
        }
        return arr;
    };

    private initEvils = (): EvilCircle[] => {
        const arr: EvilCircle[] = [];
        let ran = MathTool.ranInt;
        for (let i = 0; i < 1; i++) {
            let x = ran(0, this.width), y = ran(0, this.height);
            let evil = new EvilCircle(i === 0);
            evil.x = x;
            evil.y = y;
            evil.velX = 5;
            evil.velY = 5;
            evil.size = 20;
            evil.color = "white";
            arr.push(evil);
        }
        return arr;
    }
}

type ScoreBoardProps = {
    ballCount: number,
    getRemainCount: Function
    gameOver: Function
}

class ScoreBoard extends React.Component<ScoreBoardProps, any> {
    render() {
        return <p className={gameCss.scoreBoard}>
            {this.showScore()}
        </p>;
    }

    private showScore(): string {
        const remain = this.props.getRemainCount();
        let msg;
        if (this.props.gameOver()) {
            msg = "You've failed the game...";
        } else if (remain > 0) {
            msg = StrTool.format("remaining: {0}", this.props.getRemainCount());
        } else {
            msg = "Congratulation, you've win the game!";
        }
        return msg;
    }
}

type PlayAgainBtnProps = {
    parent: BouncingBall
    mustHide: Function
    onclick: Function
}

type PlayAgainBtnState = {
    mustHide: boolean
}

class PlayAgainBtn extends React.Component<PlayAgainBtnProps, PlayAgainBtnState> {
    constructor(props: PlayAgainBtnProps) {
        super(props);
        this.props.parent.playAgainBtn = this;
        this.state = {
            mustHide: true
        };
    }

    adjustVisibility() {
        this.setState({
            mustHide: this.props.mustHide()
        })
    }

    render() {
        return (
            <button
                className={gameCss.playAgainBtn}
                type={"button"}
                onClick={() => this.props.onclick()}
                hidden={this.state.mustHide}
            >
                <p>Start new round</p>
            </button>
        );
    }
}

type TimerProps = {
    parent: BouncingBall
    isWin: Function,
    roundTimeLimit: number
}

type TimerState = {
    remainSec: number
}

class Timer extends React.Component<TimerProps, TimerState> {
    private timer: SingletonScheduler<Timer>;

    constructor(props: TimerProps) {
        super(props);
        this.props.parent.timer = this;
        this.state = {
            remainSec: props.roundTimeLimit
        }
        this.timer = SingletonScheduler.newInstance<Timer>(this, this.startTimer, 1000);
    }

    render() {
        if (!this.timer.isRunning()) {
            this.timer.start();
        }
        if (this.props.isWin()) {
            this.timer.stop();
        }
        return (
            <p className={gameCss.timerNormal}>{this.showRemainSec()}</p>
        );
    }

    public remainSec() {
        return this.state.remainSec;
    }

    public reset() {
        this.setState({
            remainSec: this.props.roundTimeLimit
        })
    }

    private startTimer(self: Timer): void {
        if (self.state.remainSec === 0) return;
        // continue timing
        self.setState({
            remainSec: self.state.remainSec - 1
        });
    }

    private showRemainSec(): string {
        return `Time remain: ${this.state.remainSec}`;
    }
}

type StaminaBarProps = {
    target: EvilCircle
}

type StaminaBarState = {
    staminaBarCss: string
}

class StaminaBar extends React.Component<StaminaBarProps, StaminaBarState> {
    private readonly staminaWatcher: SingletonScheduler<StaminaBar>;

    constructor(props: StaminaBarProps) {
        super(props);
        this.state = {staminaBarCss: gameCss.stamina};
        this.staminaWatcher = SingletonScheduler.newInstance<StaminaBar>(this, this.watchStamina, 100);
        this.staminaWatcher.start();
    }

    render() {
        return <p className={this.state.staminaBarCss}>{`stamina: ${this.showStamina()}`}</p>;
    }

    private watchStamina(self: StaminaBar): void {
        let stamina = self.props.target.stamina;
        let element = (document.querySelector(`.${self.state.staminaBarCss}`) as HTMLElement);
        if (element == null) return;
        let next: string;
        if (stamina < 30) next = gameCss.staminaLow;
        else next = gameCss.stamina;
        element.className = next;
        self.setState({
            staminaBarCss: next
        });
    }

    private showStamina(): string {
        let s = this.props.target.stamina / 5;
        let r: string = "";
        for (let i = 0; i < s; i++) r += "|";
        return r;
    }
}

export default BouncingBall;
























