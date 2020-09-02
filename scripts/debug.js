function countMines(difficulty) {
    const dimensions = getDimensionsByDifficulty(difficulty)
    const width = dimensions['x'],
    height = dimensions['y'];
    let maxMines = Math.floor(width * height * MINE_PROBABILITY)
    let count = 0;

    for (let row = 0; row < width; row++) {
        for (let col = 0; col < height; col++) {
            if (TILES[row][col].hasMine) {
                count++;
            }
        }
    }

    console.log(`${count == maxMines}`)
}

function printBoard(TILES) {
    for ( let row = 0; row < TILES.length; row++ ) {
        let rowString = "";
        for ( let col = 0; col < TILES[row].length; col++ ) {
            let curr = TILES[row][col];
            if (curr.hasMine) {
                rowString += '* ';
            }
            else {
                rowString += curr.count.toString() + ' ';
            }
        }
        console.log(rowString);
    }
}
