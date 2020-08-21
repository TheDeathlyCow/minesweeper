import Tile from './tile.js';

function draw(difficulty) {
    var canvas = document.getElementById('game_board');

    if (canvas.getContext) {
        
        let dimensions = getDimensionsByDifficulty(difficulty)

        for (var row = 0; row < dimensions[0]; row++) {
            for (var col = 0; col < dimensions[1]; col++) {
                let tile = new Tile([row*10, col*10], false, 'rgb(200, 0, 0)');
                tile.draw();
            }
        }

        var ctx = canvas.getContext('2d');

        ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(30, 30, 50, 50);

    }
}

/**
 * Returns an array of int [x, y].
 * @param {*} difficulty 
 */
function getDimensionsByDifficulty(difficulty) {
    switch (difficulty) {
        case 'easy':
            return [10, 10];
        case 'medium':
            return [16, 16];
        case 'hard':
            return [40, 40];
        default:
            return [1, 1];
    }
}

let difficulty = 'easy';
draw(difficulty);