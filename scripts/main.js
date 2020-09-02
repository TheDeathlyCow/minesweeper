
var TILES = [];
const TILE_SIZE = 100;
const MINE_PROBABILITY = 0.1;

function draw(difficulty) {
    const dimensions = getDimensionsByDifficulty(difficulty)

    for (let row = 0; row < dimensions['x']; row++) {
        row_tiles = []
        for (let col = 0; col < dimensions['y']; col++) {
            let tile = new Tile(false, row * TILE_SIZE, col * TILE_SIZE);
            tile.draw();
            row_tiles.push(tile);
        }
        TILES.push(row_tiles);
    }

    let maxMines = Math.floor(dimensions['x'] * dimensions['y'] * MINE_PROBABILITY);
    placeMines(dimensions, maxMines);
}

function placeMines(dimensions, maxMines=10) {
    let numMines = 0;
    const width = dimensions['x'];
    const height = dimensions['y'];
    const area = width * height;
    if (maxMines >= area) {
        console.log(`Too many mines! numMines: ${numMines}, maxMines: ${maxMines}`);
        return;
    }

    for (let numMines = 0; numMines < maxMines; numMines++) {
        let row = Math.floor(Math.random() * width);
        let col = Math.floor(Math.random() * height);
        console.log(`trying a new tile at ${row}, ${col}`);

        if (TILES[row][col].hasMine) {
            findNewPosition(row, col, dimensions);
        }
        else {
            placeMineOnBoard(row, col);
        }
    }
}

function findNewPosition(row, col, dimensions) {

    let minePlaced = false;

    for (let x = -1; !minePlaced && x <= 1; x++) {
        for (let y = -1; !minePlaced && y <= 1; y++) {
            try {
                if (!TILES[row + x][col + y].hasMine) {
                    placeMineOnBoard(row + x, col + y);
                    minePlaced = true;
                }
            }
            catch(err) {
                console.log("tried to place on edge");
            }
        }
    }

    // randomly pick a new position and try again
    if (!minePlaced) {
        const width = dimensions['x'];
        const height = dimensions['y'];
        findNewPosition(Math.floor(Math.random() * width), Math.floor(Math.random() * height));
    }
}

function placeMineOnBoard(row, col) {
    TILES[row][col].placeMine();

    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            try {
                if (!TILES[row + dx][col + dy].hasMine) {
                    console.log('Increment count.');
                    TILES[row + dx][col + dy].count++;
                } else {
                    console.log('did not increment');
                }
            }
            catch(err) { console.log('Counting edge.'); }
        }
    }
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
    
    switch (difficulty.toLowerCase()) {
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
    // MAX_MINES = Math.floor(difficultySize * difficultySize * MINE_PROBABILITY);
    return {x: difficultySize, y: difficultySize};
}


let difficulty = 'easy';
draw(difficulty);
// countMines(difficulty);
printBoard(TILES);