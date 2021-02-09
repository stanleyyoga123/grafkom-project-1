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
    const size = Math.min(Math.abs(start[0] - end[0]), Math.abs(start[1] - end[1]));
    const xEnd = start[0] + ((start[0] - end[0] > 0) ? -size : size);
    const yEnd = start[1] + ((start[1] - end[1] > 0) ? -size : size);

    const v1 = start;
    const v3 = [xEnd, yEnd];
    const v4 = [v1[0], v3[1]];
    const v2 = [v3[0], v1[1]];

    return [
        v1[0], v1[1],
        v2[0], v2[1],
        v3[0], v3[1],
        v4[0], v4[1],
    ];
}

export function reshapeSquare(square, changedIdx){
    const crossIdx = changedIdx % 4;
    const size = Math.min(Math.abs(square[changedIdx][0] - square[crossIdx][0]),
        Math.abs(square[changedIdx][1] - square[crossIdx][1]));
    const x = square[crossIdx][0] + ((square[crossIdx][0] - square[changedIdx][0] > 0) ? -size : size);
    const y = square[crossIdx][1] + ((square[crossIdx][1] - square[changedIdx][1] > 0) ? -size : size);
    
    const newSquare = [[], [], [], []];

    newSquare[crossIdx] = square[crossIdx];
    newSquare[changedIdx] = [x, y];
    newSquare[(crossIdx + 1) % 4] = [square[crossIdx][0], y];
    newSquare[(changedIdx + 1) % 4] = [x, square[crossIdx][1]];

    return newSquare;

}