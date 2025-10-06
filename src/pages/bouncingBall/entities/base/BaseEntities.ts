class CircleShape {
    private _x: number;
    private _y: number;
    private _velX: number;
    private _velY: number;
    private _color: string;
    private _size: number;
    private _isAlive: boolean = true;

    get isAlive(): boolean {
        return this._isAlive;
    }

    set isAlive(value: boolean) {
        this._isAlive = value;
    }

    get x(): number {
        return this._x;
    }

    set x(value: number) {
        this._x = value;
    }

    get y(): number {
        return this._y;
    }

    set y(value: number) {
        this._y = value;
    }

    get velX(): number {
        return this._velX;
    }

    set velX(value: number) {
        this._velX = value;
    }

    get velY(): number {
        return this._velY;
    }

    set velY(value: number) {
        this._velY = value;
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
    }

    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
    }

    /**
     * @param balls {CircleShape[]} other circle shapes
     * @return {CircleShape} collided target
     */
    collisionDetected(balls: CircleShape[]): CircleShape {
        for (let ball of balls) {
            if (!ball.isAlive || this === ball) continue;
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.size + ball.size) return ball;
        }
        return null;
    }
}

export {CircleShape};