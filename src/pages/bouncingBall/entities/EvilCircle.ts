import {CircleShape} from "./base/BaseEntities";

type Action = {
    act: boolean
}

class EvilCircle extends CircleShape {
    private readonly controllable: boolean;
    private _stamina: number = 100;
    private isSprint: Action = {act: false};
    private goTop: Action = {act: false};
    private goDown: Action = {act: false};
    private goLeft: Action = {act: false};
    private goRight: Action = {act: false};
    private keyMap = new Map([
        ["ArrowUp", this.goTop],
        ["w", this.goTop],
        ["W", this.goTop],
        ["ArrowDown", this.goDown],
        ["s", this.goDown],
        ["S", this.goDown],
        ["ArrowLeft", this.goLeft],
        ["a", this.goLeft],
        ["A", this.goLeft],
        ["ArrowRight", this.goRight],
        ["d", this.goRight],
        ["D", this.goRight],
        ["Shift", this.isSprint],
    ]);

    constructor(controllable: boolean) {
        super();
        this.controllable = controllable;
        if (!controllable) return;
        this.listenKey();
    }

    listenKey() {
        if (!this.controllable) return;
        document.addEventListener("keydown", (evt) => {
            if (!this.keyMap.has(evt.key)) return;
            this.keyMap.get(evt.key).act = true;
        });
        document.addEventListener("keyup", (evt) => {
            if (!this.keyMap.has(evt.key)) return;
            this.keyMap.get(evt.key).act = false;
        });
    }

    update(width, height) {
        let right = this.x + this.size;
        let left = this.x - this.size;
        let top = this.y - this.size;
        let bottom = this.y + this.size;
        let velX = 0, velY = 0;
        if (this.goRight.act && right <= width) {
            velX = this.velX;
        } else if (this.goLeft.act && left >= 0) {
            velX = -this.velX;
        }
        if (this.goTop.act && top >= 0) {
            velY = -this.velY;
        } else if (this.goDown.act && bottom <= height) {
            velY = this.velY;
        }
        if (this.isSprint.act) {
            if (this._stamina > 0) {
                velX *= 2;
                velY *= 2;
                this._stamina--;
            }
        } else if (this._stamina < 100) {
            this._stamina++;
        }
        this.x += velX;
        this.y += velY;
    }


    get stamina(): number {
        return this._stamina;
    }
}

export default EvilCircle;