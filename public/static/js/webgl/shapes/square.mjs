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
    var colors = [];
    if (master.square_start.length != 0) {
        createSquare(master.square_start, master.square_end).forEach(el => renderedSquare.push(el));
        for (var i = 0; i < 4; ++i) {
            master.cur_color.forEach(el => colors.push(el));
            // console.log(i);
        }
    } 
    master.squares.forEach((el) => {
        el.forEach((el2) => renderedSquare.push(el2));
    });
    master.squares_color.forEach(el => colors.push(el));

    master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.bufferId);
    master.gl.bufferSubData(master.gl.ARRAY_BUFFER, 0, new Float32Array(renderedSquare));
    master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.cbufferId);
    master.gl.bufferSubData(master.gl.ARRAY_BUFFER, 0, new Float32Array(colors));
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

export function reshapeSquare(squareArr, newPoint){
    const changedIdx = squareArr[1];
    const crossIdx = (changedIdx + 2) % 4;
    const square = []
    for(let i = 2; i < 10; i+=2){
        square.push([squareArr[i], squareArr[i + 1]]);
    }

    square[changedIdx] = newPoint;

    const size = Math.min(Math.abs(square[changedIdx][0] - square[crossIdx][0]),
        Math.abs(square[changedIdx][1] - square[crossIdx][1]));
    const x = square[crossIdx][0] + ((square[crossIdx][0] - square[changedIdx][0] > 0) ? -size : size);
    const y = square[crossIdx][1] + ((square[crossIdx][1] - square[changedIdx][1] > 0) ? -size : size);
    
    const newSquare = [[], [], [], []];

    newSquare[crossIdx] = square[crossIdx];
    newSquare[changedIdx] = [x, y];
    newSquare[(crossIdx + 1) % 4] = [square[crossIdx][0], y];
    newSquare[(changedIdx + 1) % 4] = [x, square[crossIdx][1]];

    const newSquareArr = [];
    newSquare.map(pair => {
        newSquareArr.push(pair[0]);
        newSquareArr.push(pair[1]);
    })

    return newSquareArr;

}