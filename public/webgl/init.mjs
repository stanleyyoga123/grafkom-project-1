import {initShaders} from './utils/initShaders.mjs';
import {render} from './render.mjs'
import {hex2dec} from './utils/util.mjs';
import {createLine} from './shapes/line.mjs';

export function init(master) {
    master.canvas = document.getElementById('glCanvas');
    master.gl = master.canvas.getContext('webgl');

    if (!master.gl) throw new Error('Web GL Not Supported');

    // WebGL Configurations
    master.gl.viewport(0, 0, master.canvas.width, master.canvas.height);
    master.gl.clearColor(1.0, 1.0, 1.0, 1.0);

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
    var vPosition = master.gl.getAttribLocation(master.gl.program, 'vPosition');
    master.gl.vertexAttribPointer(vPosition, 2, master.gl.FLOAT, false, 0, 0);
    master.gl.enableVertexAttribArray(vPosition);

    // Color Buffer
    master.cbufferId = master.gl.createBuffer();
    master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.cbufferId);
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
                        // Square Event
                    } else if (radio[i].value == 'polygon') {
                        // Polygon Event
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
                        // Square Event
                    } else if (radio[i].value == 'polygon') {
                        // Polygon Event
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
                        master.line_start = [];
                        master.line_end = [];
                    } else if (radio[i].value == 'square') {
                        // Square Event
                    } else if (radio[i].value == 'polygon') {
                        // Polygon Event
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

