import {initShaders} from './utils/initShaders.mjs';
import {render} from './render.mjs'
import {hex2dec} from './utils/util.mjs';
import {createLine} from './shapes/line.mjs';
import {getPoint} from './action/line.mjs';

export function init(master) {
    master.canvas = document.getElementById('glCanvas');
    master.gl = master.canvas.getContext('webgl');

    if (!master.gl) throw new Error('Web GL Not Supported');

    // WebGL Configurations
    master.gl.viewport(0, 0, master.canvas.width, master.canvas.height);
    master.gl.clearColor(1.0, 1.0, 1.0, 1.0);
    master.gl.clear(master.gl.COLOR_BUFFER_BIT);

    // Load Shaders 
    var vs = document.getElementById('shaderVs').innerHTML;
    var fs = document.getElementById('shaderFs').innerHTML;
    if (!initShaders(master.gl, vs, fs)) {
        console.log('Failed to intialize shaders.');
        return;
    }

    // Vertex Buffer
    master.bufferId = master.gl.createBuffer();
    master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.bufferId);
    master.gl.bufferData(master.gl.ARRAY_BUFFER, 8 * 200000, master.gl.STATIC_DRAW);
    var vPosition = master.gl.getAttribLocation(master.gl.program, 'vPosition');
    master.gl.vertexAttribPointer(vPosition, 2, master.gl.FLOAT, false, 0, 0);
    master.gl.enableVertexAttribArray(vPosition);

    // Color Buffer
    master.cbufferId = master.gl.createBuffer();
    master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.cbufferId);
    master.gl.bufferData(master.gl.ARRAY_BUFFER, 8 * 200000, master.gl.STATIC_DRAW);
    var vColor = master.gl.getAttribLocation(master.gl.program, 'vColor');
    master.gl.vertexAttribPointer(vColor, 3, master.gl.FLOAT, false, 0, 0);
    master.gl.enableVertexAttribArray(vColor);

    events(master);
}

function events(master) {
    master.canvas.addEventListener('mousemove', (e) => {
        if (master.mouseClicked) {
            var x = -1 + 2*e.offsetX/master.canvas.width;
            var y = -1 + 2*(master.canvas.height - e.offsetY)/master.canvas.height;
            var radio = document.getElementsByTagName('input');
            
            for (var i = 0; i < radio.length; ++i) {
                if (radio[i].type == 'radio' && radio[i].checked) {
                    if (radio[i].value == 'line') {
                        master.line_end = [x,y];
                    } else if (radio[i].value == 'square') {
                        master.square_end = [x,y];
                    } else if (radio[i].value == 'polygon') {
                        // Polygon Event
                    } else if (radio[i].value == 'change-line') {
                        if (master.line_move.length > 0) {
                            if (master.line_move[5] == 0) {
                                master.lines[master.line_move[0]] = createLine([x,y], [master.line_move[3], master.line_move[4]]);
                            } else {
                                master.lines[master.line_move[0]] = createLine([master.line_move[1], master.line_move[2]], [x,y]);
                            }
                        }
                    }
                }
            }
            render(master);
        }
    });

    master.canvas.addEventListener('mousedown', (e) => {
        master.mouseClicked = true;
        var x = -1 + 2*e.offsetX/master.canvas.width;
        var y = -1 + 2*(master.canvas.height - e.offsetY)/master.canvas.height;

        var radio = document.getElementsByTagName('input');
            
        for (var i = 0; i < radio.length; ++i) {
            if (radio[i].type == 'radio' && radio[i].checked) {
                if (radio[i].value == 'line') {
                    master.line_start = [x,y];
                    master.line_end = [x,y];
                } else if (radio[i].value == 'square') {
                    master.square_start = [x,y];
                    master.square_end = [x,y];
                } else if (radio[i].value == 'polygon') {
                    // Polygon Event
                } else if (radio[i].value == 'change-line') {
                    getPoint(master, [x,y]);
                }
            }
        }
        render(master);
    });

    master.canvas.addEventListener('mouseup', () => {
        master.mouseClicked = false;

        var radio = document.getElementsByTagName('input');
            
        for (var i = 0; i < radio.length; ++i) {
            if (radio[i].type == 'radio' && radio[i].checked) {
                if (radio[i].value == 'line') {
                    // Line Event
                    master.lines.push(createLine(master.line_start, master.line_end));
                    // master.lineColor.forEach(el => master.lines_color.push(el));
                    master.line_start = [];
                    master.line_end = [];
                } else if (radio[i].value == 'square') {
                    master.squares.push(createLine(master._start, master.line_end));
                    master.square_start = [];
                    master.square_end = [];
                } else if (radio[i].value == 'polygon') {
                    // Polygon Event
                } else if (radio[i].value == 'change-line') {
                    master.line_move = [];
                }
            }
        }
        render(master);
    });

    var colorInput = document.getElementById('color-input');
    colorInput.addEventListener('change', () => {
        const color = colorInput.value;
        master.lineColor = [hex2dec(color.slice(1,3))/255, 
                            hex2dec(color.slice(3,5))/255, 
                            hex2dec(color.slice(5,7))/255];
    });
}

