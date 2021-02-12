import {initShaders} from './utils/initShaders.mjs';
import {render} from './render.mjs'
import {hex2dec} from './utils/util.mjs';
import {createLine} from './shapes/line.mjs';
import {createSquare} from './shapes/square.mjs';
import {getPointInLine} from './action/line.mjs';

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
    const exportBtn = document.getElementById('export-btn');
    const importBtn = document.getElementById('import-btn');
    const uploadBtn = document.getElementById('upload-btn');

    exportBtn.addEventListener('click', event => {
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(master));
        var downloadWidget = document.getElementById('download-link');
        downloadWidget.setAttribute("href",     dataStr     );
        downloadWidget.setAttribute("download", "data.json");
        downloadWidget.click();
        // console.log(JSON.stringify(master));
    });

    importBtn.addEventListener('click', (e) => {
        if (window.FileList && window.File && window.FileReader) {
            uploadBtn.click();
        } else {
            alert("file upload not supported by your browser!");
        }
    });

    uploadBtn.addEventListener('change', (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
  
        reader.addEventListener('load', event => {
            try{
                var data = JSON.parse(event.target.result);
            } catch (err) {
                alert(`invalid json file data!\n${err}`);
            }

            master.loadJSONData(data);
        });

        reader.readAsText(file);
        render(master);
    });

    master.canvas.addEventListener('mousemove', (e) => {
        if (master.mouseClicked) {
            var x = -1 + 2*e.offsetX/master.canvas.width;
            var y = -1 + 2*(master.canvas.height - e.offsetY)/master.canvas.height;
            var radio = document.getElementsByTagName('input');
            // var eventType;
            
            for (var i = 0; i < radio.length; ++i) {
                if (radio[i].type == 'radio' && radio[i].checked) {
                    if (radio[i].value == 'line') {
                        master.line_end = [x,y];
                    } else if (radio[i].value == 'square') {
                        master.square_end = [x,y];
                    } else if (radio[i].value == 'polygon') {
                        // Event Polygon
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
                    if (master.start_poly) {
                        master.cur_poly.push(x);
                        master.cur_poly.push(y);
                        master.cur_n_poly += 1;
                    }
                } else if (radio[i].value == 'change-line') {
                    getPointInLine(master, [x,y]);
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
                    for (var i = 0; i < 4; ++i) master.cur_color.forEach(el => master.lines_color.push(el));
                    master.line_start = [];
                    master.line_end = [];
                } else if (radio[i].value == 'square') {
                    master.squares.push(createSquare(master.square_start, master.square_end));
                    for (var i = 0; i < 4; ++i) master.cur_color.forEach(el => master.squares_color.push(el));
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
        master.cur_color = [hex2dec(color.slice(1,3))/255, 
                            hex2dec(color.slice(3,5))/255, 
                            hex2dec(color.slice(5,7))/255];
    });

    var polyToggler = document.getElementById('start-poly');
    polyToggler.addEventListener('change', () => {
        master.start_poly = polyToggler.checked;
        if (!master.start_poly) {
            if (master.cur_poly.length > 0) {
                master.polygons.push(master.cur_poly);
                master.n_poly.push(master.cur_n_poly);
                for (var i = 0; i < master.cur_n_poly; ++i) master.cur_color.forEach(el => master.polygons_color.push(el));
            }
            master.cur_poly = [];
            master.cur_n_poly = 0;
        }
    });
}

