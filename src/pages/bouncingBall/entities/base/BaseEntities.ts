class CircleShape {
    private _x: number;
    private _y: number;
    private _velX: number;
    private _velY: number;
    private _color: string;
    private _size: number;

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
}

export {CircleShape};