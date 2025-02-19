function renderLine(master) {
    var renderedLine = [];
    var colors = []
    if (master.line_start.length != 0) {
        createLine(master.line_start, master.line_end).forEach(el => renderedLine.push(el));
        for (var i = 0; i < 4; ++i) master.cur_color.forEach(el => colors.push(el));
    }

    master.lines.forEach((el) => {
        el.forEach((el2) => renderedLine.push(el2));
    });
    master.lines_color.forEach(el => colors.push(el));

    master.gl.clear(master.gl.COLOR_BUFFER_BIT | master.gl.DEPTH_BUFFER_BIT);
    master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.bufferId);
    master.gl.bufferSubData(master.gl.ARRAY_BUFFER, 0, new Float32Array(renderedLine));
    master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.cbufferId);
    master.gl.bufferSubData(master.gl.ARRAY_BUFFER, 0, new Float32Array(colors));
    for (var i = 0; i < renderedLine.length / 8; ++i) master.gl.drawArrays(master.gl.TRIANGLE_FAN, 4 * i, 4);
}

function createLine(start, end) {
    const width = 0.003;
    const deg = Math.atan2(end[1]-start[1], end[0]-start[0]) * 180 / Math.PI;
    var p1 = rotate(start[0], start[1], start[0], start[1]-width, -deg);
    var p2 = rotate(start[0], start[1], start[0], start[1]+width, -deg);
    var p3 = rotate(end[0], end[1], end[0], end[1]+width, -deg);
    var p4 = rotate(end[0], end[1], end[0], end[1]-width, -deg);
    return [
        p1[0], p1[1],
        p2[0], p2[1],
        p3[0], p3[1], 
        p4[0], p4[1],
    ];
}

// export function renderLine(master) {
//     var renderedLine = [];
//     if (master.line_start.length != 0) createLine(master.line_start, master.line_end).forEach(el => renderedLine.push(el));

//     master.lines.forEach((el) => {
//         el.forEach((el2) => renderedLine.push(el2));
//     });

//     master.gl.clear(master.gl.COLOR_BUFFER_BIT);
//     master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.bufferId);
//     master.gl.bufferSubData(master.gl.ARRAY_BUFFER, 0, new Float32Array(renderedLine));
//     master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.cbufferId);
//     master.gl.bufferSubData(master.gl.ARRAY_BUFFER, 0, new Float32Array(master.colors));
//     for (var i = 0; i < renderedLine.length / 2; ++i) master.gl.drawArrays(master.gl.LINES, 2*i, 2);
// }

// export function createLine(start, end) {
//     return [
//         start[0], start[1],
//         end[0], end[1],
//     ];
// }