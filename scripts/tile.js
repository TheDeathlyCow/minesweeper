const body = document.getElementById('body');

class Tile {
    
    /**
     * Creates a new game tile.
     * @param {boolean} hasMine A boolean that says whether or not this tile has a mine.
     * @param {string} colour An RGB string that determines the tile's colour. Default: 'blue'
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
            flagTile(event.pageX, event.pageY);
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

function flagTile(x, y) {
    let row = Math.floor(x / TILE_SIZE);
    let col = Math.floor(y / TILE_SIZE);

    let selectedTile = TILES[row][col];
    if (selectedTile.colour === 'blue') {
        if (TILES[row][col].hasMine) {
            console.log("flagged correctly");
        }
        TILES[row][col].draw('red');
    }
    else if (selectedTile.colour === 'red') {
        TILES[row][col].draw('blue');
    }
    
}