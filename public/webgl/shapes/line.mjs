export function renderLine(master) {
    var renderedLine = [];
    createLine(master.line_start, master.line_end).forEach(el => renderedLine.push(el));
    master.lines.forEach((el) => {
        el.forEach((el2) => renderedLine.push(el2));
    });

    master.gl.clear(master.gl.COLOR_BUFFER_BIT);
    master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.bufferId);
    master.gl.bufferData(master.gl.ARRAY_BUFFER, new Float32Array(renderedLine), master.gl.STATIC_DRAW);
    master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.cbufferId);
    master.gl.bufferData(master.gl.ARRAY_BUFFER, new Float32Array(master.colors), master.gl.STATIC_DRAW);
    for (var i = 0; i < renderedLine.length / 4; ++i) master.gl.drawArrays(master.gl.TRIANGLE_FAN, 4 * i, 4);
}

export function createLine(start, end) {
    const width = 0.007;
    return [
        start[0]-width, start[1]-width,
        start[0]-width, start[1]+width,
        end[0]+width, end[1]+width,
        end[0]+width, end[1]-width,
    ];
}