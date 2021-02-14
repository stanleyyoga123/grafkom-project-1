import {distance} from './../utils/util.mjs';

const threshold = 0.015;

export function getPointInPoly(master, point) {
    var point_start_color = 0;
    for (var i = 0; i < master.polygons.length; ++i) {
        for (var j = 0; j < master.polygons[i].length; j+=2) {
            if (distance(master.polygons[i][j], master.polygons[i][j+1], point[0], point[1]) < threshold) {
                master.polygons_move = [i, j, point_start_color];
                return;
            }
        }
        point_start_color += (master.polygons[i].length*3/2);
    }
    master.polygons_move = [];
}