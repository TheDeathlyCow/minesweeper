
var TILES = [];
const TILE_SIZE = 100;
var numMines = 0;
var MAX_MINES;
const MINE_PROBABILITY = 0.1;

function draw(difficulty) {
    let dimensions = getDimensionsByDifficulty(difficulty)

    for (let row = 0; row < dimensions['x']; row++) {
        row_tiles = []
        for (let col = 0; col < dimensions['y']; col++) {

            let tile = drawNextTile(row, col);
            row_tiles.push(tile);

        }
        TILES.push(row_tiles);
    }

    console.log(`There are ${numMines} mines.`);
}

/**
 * Draws a tile at the specified postion.
 * @param {number} row 
 * @param {number} col 
 */
function drawNextTile(row, col) {
    let tile = new Tile(false, row * TILE_SIZE, col * TILE_SIZE);
    tile.draw();
    return tile;
}

/**
 * Returns an object of the form {x: int, y: int}.
 * @param {string} difficulty 
 */
function getDimensionsByDifficulty(difficulty) {
    let easySize = 10,
    mediumSize = 16,
    hardSize = 35,
    defaultSize = 1;
    
    switch (difficulty) {
        case 'easy':
            return difficultyBoard(easySize);
        case 'medium':
            return difficultyBoard(mediumSize);
        case 'hard':
            return difficultyBoard(hardSize);
        default:
            return difficultyBoard(defaultSize);
    }
}

function difficultyBoard(difficultySize) {
    MAX_MINES = Math.floor(difficultySize * difficultySize * MINE_PROBABILITY);
    return {x: difficultySize, y: difficultySize};
}

let difficulty = 'easy';
draw(difficulty);