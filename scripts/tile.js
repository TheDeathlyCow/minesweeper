const GAME_BOARD = document.getElementById('gameBoard');

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
        this.count = 0;

        this.cvns = document.createElement('canvas');

        this.cvns.style.left = `${posX}px`;
        this.cvns.style.top = `${posY}px`;
        this.cvns.style.position = 'absolute';

        this.cvns.id = `tile_${posX},${posY}`;
        this.cvns.height = TILE_SIZE;
        this.cvns.width = TILE_SIZE;

        this.cvns.onclick = function(event) {
            revealTile(event.pageX, event.pageY);
        };

        this.cvns.oncontextmenu = function(event) {
            event.preventDefault();
            flagTile(event.pageX, event.pageY);
        };

        GAME_BOARD.appendChild(this.cvns);

    }

    getSize() {
        return size;
    }

    flag() {
        if (!this.isFlagged) {
            this.isFlagged = true;
            this.draw('red');
        }
        else {
            this.isFlagged = false;
            this.draw('blue');
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
        if (!this.isRevealed) {
            this.isRevealed = true;
            this.draw('white');
            let ctx = this.cvns.getContext('2d');
            ctx.font = '75pt Arial';
            ctx.fillStyle = 'black';

            let revealText = this.getRevealText();

            ctx.fillText(revealText, TILE_SIZE / 4, TILE_SIZE * 0.85 );
            console.log(revealText);   
        }
    } 

    getRevealText() {
        if (this.hasMine) {
            return '*';
        }
        return `${this.count}`;
    }

    draw(colour=this.colour) {
        this.setColour(colour);
        let ctx = this.cvns.getContext('2d');
        ctx.fillStyle = colour;
        ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE);
    }

    placeMine() {
        this.hasMine = true;
        // this.draw('green');
    }
}

function revealTile(x, y) {
    console.log("CLIIICK");
    let rect = GAME_BOARD.getBoundingClientRect();
    let row = Math.floor((x) / TILE_SIZE);
    let col = Math.floor((y) / TILE_SIZE);

    let selectedTile = TILES[row][col];
    if (selectedTile.colour === 'blue') {
        TILES[row][col].reveal();
        if (selectedTile.hasMine) {
            
            gameOver();
        }
        else if ( selectedTile.count == 0  ) {
            revealAdjacentZeros(row, col);
        }
    }
}

function revealAdjacentZeros(row, col) {
    if (TILES[row][col].count == 0) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                try {
                    if (!TILES[row + dx][col + dy].isRevealed) {
                        TILES[row + dx][col + dy].reveal();
                        if (TILES[row + dx][col + dy].count === 0) {
                            revealAdjacentZeros(row + dx, col + dy);
                        } 
                    }
                }
                catch(err) { 
                    console.log(`Failed to reveal at ${row + dx}, ${col + dy}.`);
                }
            }
        }
    }
}

function flagTile(x, y) {
    let row = Math.floor(x / TILE_SIZE);
    let col = Math.floor(y / TILE_SIZE);

    let selectedTile = TILES[row][col];
    if (selectedTile.colour === 'blue') {
        if (selectedTile.hasMine) {
            console.log("flagged correctly");
        }
        TILES[row][col].flag();
    }
    else if (selectedTile.colour === 'red') {
        TILES[row][col].draw('blue');
    }
    
}