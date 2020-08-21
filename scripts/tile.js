
export default class Tile {

    constructor(pos, hasMine, colour) {
        this.hasMine = hasMine;
        this.pos = pos;
        this.colour = colour;
        this.isRevealed = false;
        this.size = 10;
        this.ctx = canvas.getContext('2d');
    }

    getX() {
        return this.pos[0];
    }

    getY() {
        return this.pos[1];
    }

    reveal() {
        this.isRevealed = true;
    }

    draw() {
        console.log("drew tile!");
        let x = this.getX();
        let y = this.getY();
        this.ctx.fillStyle = this.colour;
        this.ctx.fillRect(x, y, x + this.size, y + this.size);
    }
}