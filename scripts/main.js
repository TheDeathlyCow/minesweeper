
var TILES = [];

function draw(difficulty) {
    let dimensions = getDimensionsByDifficulty(difficulty)

    for (let row = 0; row < dimensions['x']; row++) {
        row_tiles = []
        for (let col = 0; col < dimensions['y']; col++) {
            let tile = new Tile(false, row * 100, col * 100);
            tile.draw();
            row_tiles.push(tile);
        }
        TILES.push(row_tiles);
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
            return {x: 40, y: 40};
        default:
            return {x: 1, y: 1};
    }
}

let difficulty = 'easy';
draw(difficulty);