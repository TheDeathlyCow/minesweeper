
var TILES = [];
const TILE_SIZE = 100;

function draw(difficulty) {
    let dimensions = getDimensionsByDifficulty(difficulty)

    for (let row = 0; row < dimensions['x']; row++) {
        row_tiles = []
        for (let col = 0; col < dimensions['y']; col++) {
            let tile = new Tile(false, row * TILE_SIZE, col * TILE_SIZE);
            tile.draw();

            row_tiles.push(tile);
        }
        TILES.push(row_tiles);
    }
}

function onClick(x, y) {
    let row = Math.floor(x / TILE_SIZE);
    let col = Math.floor(y / TILE_SIZE);

    let selectedTile = TILES[row][col];
    if (selectedTile.colour == 'blue') {
        TILES[row][col].draw('red');
    }
    else if (selectedTile.colour == 'red') {
        TILES[row][col].draw('blue');
    }
    
}

/**
 * Returns an array of int [x, y].
 * @param {*} difficulty 
 */
function getDimensionsByDifficulty(difficulty) {
    switch (difficulty) {
        case 'easy':
            return {x: 10, y: 10};
        case 'medium':
            return {x: 16, y: 16};
        case 'hard':
            return {x: 35, y: 35};
        default:
            return {x: 1, y: 1};
    }
}

let difficulty = 'hard';
draw(difficulty);