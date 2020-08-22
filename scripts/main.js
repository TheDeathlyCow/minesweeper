
function draw(difficulty) {
    let dimensions = getDimensionsByDifficulty(difficulty)

    for (var row = 0; row < dimensions['x']; row++) {
        for (var col = 0; col < dimensions['y']; col++) {
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            
            let tile = new Tile(false, `rgb(${r}, ${g}, ${b})`);
            tile.setPos([row * tile.getSize(), col * tile.getSize()]);
            tile.draw();
        }
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
