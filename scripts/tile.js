const body = document.getElementById('body');

class Tile {
    
    /**
     * Creates a new game tile.
     * @param {*} hasMine A boolean that says whether or not this tile has a mine.
     * @param {*} colour A string of the format `rgb(${red}, ${green}, ${blue})` that determines the tile's colour. Default: rgb(68, 85, 90)
     */
    constructor(hasMine, posX, posY, colour='blue') {
        this.hasMine = hasMine;
        this.colour = colour;
        this.isRevealed = false;
        this.isFlagged = false;

        this.cvns = document.createElement('canvas');

        this.cvns.style.left = `${posX}px`;
        this.cvns.style.top = `${posY}px`;
        this.cvns.style.position = 'absolute';

        this.cvns.id = `tile_${posX},${posY}`;
        this.cvns.height = TILE_SIZE;
        this.cvns.width = TILE_SIZE;

        this.cvns.onclick = function(event) {
            onClick(event.pageX, event.pageY);
        };

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

    setColour(colour) {
        this.colour = colour;
    }

    reveal() {
        this.isRevealed = true;
    }

    draw(colour=this.colour) {
        this.setColour(colour);
        let ctx = this.cvns.getContext('2d');
        ctx.fillStyle = colour;
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
    }
}