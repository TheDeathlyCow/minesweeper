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
