export function rectangleVertex(point) {
    const width = 0.003;
    return [
        point[0]-width, point[1]-width,
        point[0]-width, point[1]+width,
        point[0]+width, point[1]+width,
        point[0]+width, point[1]-width,
    ];
}

export function renderSquare(master) {
    var renderedSquare = [];
    if (master.square_start.length != 0) createSquare(master.square_start, master.square_end).forEach(el => renderedSquare.push(el));
    master.squares.forEach((el) => {
        el.forEach((el2) => renderedSquare.push(el2));
    });

    // master.gl.clear(master.gl.COLOR_BUFFER_BIT);
    master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.bufferId);
    // master.gl.bufferData(master.gl.ARRAY_BUFFER, new Float32Array(renderedSquare), master.gl.STATIC_DRAW);
    master.gl.bufferSubData(master.gl.ARRAY_BUFFER, 0, new Float32Array(renderedSquare));
    master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.cbufferId);
    // master.gl.bufferData(master.gl.ARRAY_BUFFER, new Float32Array(master.colors), master.gl.STATIC_DRAW);
    master.gl.bufferSubData(master.gl.ARRAY_BUFFER, 0, new Float32Array(master.colors));
    for (var i = 0; i < renderedSquare.length / 4; ++i) master.gl.drawArrays(master.gl.TRIANGLE_FAN, 4 * i, 4);
        
}

export function createSquare(start, end) {
    const v1 = start;
    const v4 = end;
    const v3 = [start[0], end[1]];
    const v2 = [end[0], start[1]];
    // return [
    //     v1[0], v1[1],
    //     v2[0], v2[1],
    //     v3[0], v3[1], 
    //     v2[0], v2[1],
    //     v3[0], v3[1], 
    //     v4[0], v4[1],
    // ];
    return [
        v1[0], v1[1],
        v2[0], v2[1],
        v4[0], v4[1],
        v3[0], v3[1],
    ];
}