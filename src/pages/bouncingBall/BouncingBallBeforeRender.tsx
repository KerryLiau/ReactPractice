import React, {ReactElement, useEffect, useRef} from "react";
import gameCss from "./BouncingBall.module.css";
import Ball from "./entities/Ball";
import MathTool from "../../tool/MathTool";
import StrTool from "../../tool/StrTool";
import EvilCircle from "./entities/EvilCircle";
import {CircleShape} from "./entities/base/BaseEntities";

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
const initEvils = (): EvilCircle[] => {
    const arr: EvilCircle[] = [];
    let ran = MathTool.ranInt;
    let x = ran(0, Width), y = ran(0, Height);
    let evil = new EvilCircle(true);
    evil.x = x;
    evil.y = y;
    evil.velX = 8;
    evil.velY = 8;
    evil.size = 20;
    evil.color = "white";
    arr.push(evil);
    return arr;
}
const evils = initEvils();

class BouncingBall extends React.Component<any, any> {
    render(): ReactElement {
        return (
            <div>
                <h1 className={gameCss.gameTitle}>bouncing balls</h1>
                <p className={gameCss.scoreBoard}>{"score: 0"}</p>
                <Canvas/>
            </div>
        );
    }
}

/**
 * Use hooker to create and render canvas,
 * the hooker must call in function component
 * @constructor
 */
function Canvas() {
    return <canvas ref={DrawCanvas()}/>;
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

function randomRGB(): string {
    const ran = MathTool.ranInt;
    return StrTool.format("rgb({0},{1},{2})", ran(0, 255), ran(0, 255), ran(0, 255));
}

function animateLoop(ctx: CanvasRenderingContext2D) {
    const render = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
        ctx.fillRect(0, 0, Width, Height);
        // bouncing ball
        for (let ball of balls) {
            if (!ball.isAlive) continue;
            drawArc(ctx, ball);
            ball.update(Width, Height);
            if (!ball.collisionDetected(balls)) continue;
            handleBallCollide(ball);
        }
        // evil circle
        for (let evil of evils) {
            drawStroke(ctx, evil);
            evil.update(Width, Height);
            const target = evil.collisionDetected(balls);
            if (target == null) continue;
            handleEvilCollide(target as Ball);
        }
        window.requestAnimationFrame(render);
    };
    render();
}

function handleBallCollide(ball: Ball) {
    ball.color = randomRGB();
    ball.velX = -ball.velX;
    ball.velY = -ball.velY;
}

function handleEvilCollide(ball: Ball) {
    ball.isAlive = false;
}

function drawArc(ctx: CanvasRenderingContext2D, circle: CircleShape) {
    ctx.fillStyle = circle.color;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
    ctx.fill();
}

function drawStroke(ctx: CanvasRenderingContext2D, circle: CircleShape) {
    ctx.strokeStyle = circle.color;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
    ctx.lineWidth = 5;
    ctx.stroke();
}

export default BouncingBall;
























