import {distance} from './../utils/util.mjs';

const threshold = 0.015;

export function getPointInSquare(master, point) {
    for (var i = 0; i < master.squares.length; ++i) {
        for (var j = 0; j < master.squares[i].length; j+=2) {
            if (distance(master.squares[i][j], master.squares[i][j+1], point[0], point[1]) < threshold) {
                var x_left = (master.squares[i][0] + master.squares[i][2])/2,
                    y_left = (master.squares[i][1] + master.squares[i][3])/2,
                    x_right = (master.squares[i][4] + master.squares[i][6])/2,
                    y_right = (master.squares[i][5] + master.squares[i][7])/2;
                if (j > 3) {
                    master.square_move = [i, x_left, y_left, x_right, y_right, 1];
                } else {
                    master.square_move = [i, x_left, y_left, x_right, y_right, 0];
                }
            }
        }
    }
}