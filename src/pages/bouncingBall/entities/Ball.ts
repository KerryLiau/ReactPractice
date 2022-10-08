import {CircleShape} from "./base/BaseEntities";

class Ball extends CircleShape {
    /**
     * @param width {number} canvas width
     * @param height {number} canvas height
     */
    update(width, height) {
        if ((this.x + this.size) >= width) {
            this.velX = -(this.velX);
        }

        if ((this.x - this.size) <= 0) {
            this.velX = -(this.velX);
        }

        if ((this.y + this.size) >= height) {
            this.velY = -(this.velY);
        }

        if ((this.y - this.size) <= 0) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    /**
     * @param balls {Ball[]} other balls
     * @return {boolean}
     */
    collisionDetected(balls: Ball[]) {
        for (let ball of balls) {
            if (this === ball) continue;
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.size + ball.size) return true;
        }
        return false;
    }

}

export default Ball;