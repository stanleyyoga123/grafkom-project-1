import {rectangleVertex} from './shapes/rectangle.mjs';
import {renderLine} from './shapes/line.mjs'

export function render(master) {
    renderLine(master);
    // var newPoints = [];
    // master.points.forEach((el) => {
    //     var temp = rectangleVertex(el);
    //     temp.forEach(point => newPoints.push(point));
    // });

    // master.gl.clear(master.gl.COLOR_BUFFER_BIT);
    // master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.bufferId);
    // master.gl.bufferData(master.gl.ARRAY_BUFFER, new Float32Array(newPoints), master.gl.STATIC_DRAW);
    // master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.cbufferId);
    // master.gl.bufferData(master.gl.ARRAY_BUFFER, new Float32Array(master.colors), master.gl.STATIC_DRAW);
    // for (var i = 0; i < newPoints.length / 4; i++) master.gl.drawArrays(master.gl.TRIANGLE_FAN, 4 * i, 4);
}