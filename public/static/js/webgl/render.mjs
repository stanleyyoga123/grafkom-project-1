import {renderLine} from './shapes/line.mjs'
import {renderSquare} from './shapes/square.mjs'

export function render(master, type) {
    if(type == 'line'){
        renderLine(master);
    } else if (type == 'square'){
        renderSquare(master);
    } else if (type == 'polygon'){

    }
}