import React, {ReactElement, useEffect, useRef} from "react";
import gameCss from "./BouncingBall.module.css";
import Ball from "./entities/Ball";
import MathTool from "../../tool/MathTool";
import StrTool from "../../tool/StrTool";

class BouncingBall extends React.Component<any, any> {
    render(): ReactElement {
        return (
            <div>
                <h1 className={gameCss.gameTitle}>bouncing balls</h1>
                <Canvas/>
            </div>
        );
    }
}

function Canvas() {
    return <canvas ref={DrawCanvas()}/>
}

const Width = window.innerWidth / 1.5;
const Height = window.innerHeight / 1.5;
const BallCount = 10;
const initBalls = (): Ball[] => {
    const arr: Ball[] = [];
    for (let i = 0; i < BallCount; i++) {
        const ball = new Ball();
        let ran = MathTool.ranInt;
        let x = ran(0, Width), y = ran(0, Height);
        while (ball.collisionDetected(arr)) {
            x = ran(0, Width);
            y = ran(0, Height);
        }
        ball.x = x;
        ball.y = y;
        ball.velX = ran(-7, 7);
        ball.velY = ran(-7, 7);
        ball.size = ran(0, 10) + 10;
        ball.color = randomRGB();
        arr.push(ball);
    }
    return arr;
};
const balls = initBalls();

function randomRGB(): string {
    const ran = MathTool.ranInt;
    return StrTool.format("rgb({0},{1},{2})", ran(0, 255), ran(0, 255), ran(0, 255));
}

function DrawCanvas() {
    const ref = useRef(null);
    useEffect(() => {
        const canvas: HTMLCanvasElement = ref.current;
        canvas.width = Width;
        canvas.height = Height;
        const ctx = canvas.getContext("2d");
        animateLoop(ctx);
    }, []);
    return ref;
}

function animateLoop(ctx: CanvasRenderingContext2D) {
    const render = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
        ctx.fillRect(0, 0, Width, Height);
        for (let ball of balls) {
            draw(ctx, ball);
            ball.update(Width, Height);
            if (!ball.collisionDetected(balls)) continue;
            handleCollide(ball);
        }
        window.requestAnimationFrame(render);
    };
    render();
}

function handleCollide(ball: Ball) {
    ball.color = randomRGB();
    ball.velX = -ball.velX;
    ball.velY = -ball.velY;
}

function draw(ctx: CanvasRenderingContext2D, ball: Ball) {
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, 2 * Math.PI);
    ctx.fill();
}

export default BouncingBall;
























