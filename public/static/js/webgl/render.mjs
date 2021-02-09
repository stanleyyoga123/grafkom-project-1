import {renderLine} from './shapes/line.mjs'
import {renderSquare} from './shapes/square.mjs'
import {renderPolygon} from './shapes/polygon.mjs'

export function render(master) {
    // if(type == 'line'){
        renderLine(master);
    // } else if (type == 'square'){
        renderSquare(master);
    // } else if (type == 'polygon'){
        renderPolygon(master);
    // }
}