import {distance} from './../utils/util.mjs';

const threshold = 0.015;

export function getPointInLine(master, point) {
    for (var i = 0; i < master.lines.length; ++i) {
        for (var j = 0; j < master.lines[i].length; j+=2) {
            if (distance(master.lines[i][j], master.lines[i][j+1], point[0], point[1]) < threshold) {
                var x_left = (master.lines[i][0] + master.lines[i][2])/2,
                    y_left = (master.lines[i][1] + master.lines[i][3])/2,
                    x_right = (master.lines[i][4] + master.lines[i][6])/2,
                    y_right = (master.lines[i][5] + master.lines[i][7])/2;
                if (j > 3) {
                    master.line_move = [i, x_left, y_left, x_right, y_right, 1];
                } else {
                    master.line_move = [i, x_left, y_left, x_right, y_right, 0];
                }
            }
        }
    }
}