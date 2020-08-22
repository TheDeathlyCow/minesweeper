const body = document.getElementById('game_board');
const size = 100

class Tile {
    
    /**
     * Creates a new game tile.
     * @param {*} pos An array of [x. y] coordinates.
     * @param {*} hasMine A boolean that says whether or not this tile has a mine.
     * @param {*} colour A string of the format `rgb(${red}, ${green}, ${blue})` that determines the tile's colour.
     */
    constructor(hasMine, colour='rgb(68, 85, 90)', pos={x: 0, y: 0}) {
        this.hasMine = hasMine;
        this.pos = pos;
        this.colour = colour;
        this.isRevealed = false;
        this.isFlagged = false;

        this.cvns = document.createElement('canvas');
        this.cvns.id = `tile_${this.getX()},${this.getY()}`
        this.cvns.height = size;
        this.cvns.width = size;
        this.ctx = this.cvns.getContext('2d');
        body.appendChild(this.cvns);
    }

    getSize() {
        return size;
    }

    flag() {
        if (this.isFlagged) {
            this.isFlagged = true;
        }
        else {
            this.isFlagged = false;
        }
    }

    isCorrectlyFlagged() {
        if (this.isFlagged && this.hasMine) {
            return true;
        }
        return false;
    }

    setPos(pos) {
        this.pos = pos;
    }

    setColour(colour) {
        this.colour = colour;
    }

    getX() {
        return this.pos['x'];
    }

    getY() {
        return this.pos['y'];
    }

    reveal() {
        this.isRevealed = true;
    }

    draw() {
        let x = this.getX();
        let y = this.getY();
        this.ctx.fillStyle = this.colour;
        this.ctx.fillRect(x, y, x + size, y + size);
    }
}