import {distance} from './../utils/util.mjs';

const threshold = 0.015;

export function getPointInSquare(master, point) {
    for (let i = 0; i < master.squares.length; ++i) {
        for (let j = 0; j < master.squares[i].length; j+=2) {
            if (distance(master.squares[i][j], master.squares[i][j+1], point[0], point[1]) < threshold) {
                master.square_move = [i, j/2];
                master.squares[i].map(el => {
                    master.square_move.push(el)
                });
                console.log("mouse_down", master.square_move)
                return;
            }
        }
    }
}