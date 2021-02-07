export function renderPolygon(master) {
    var renderedPolygon = [];
    if (master.cur_n_poly > 2) {
        master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.bufferId);
        master.gl.bufferSubData(master.gl.ARRAY_BUFFER, 0, new Float32Array(master.cur_poly));
        master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.cbufferId);
        master.gl.bufferSubData(master.gl.ARRAY_BUFFER, 0, new Float32Array(master.lineColor));
        master.gl.drawArrays(master.gl.TRIANGLE_FAN, 0, master.cur_n_poly);
    }

    for (var i = 0; i < master.polygons.length; ++i) {
        for (var j = 0; j < master.polygons[i].length; ++j) {
            renderedPolygon.push(master.polygons[i][j]);
        }
    }


    master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.bufferId);
    master.gl.bufferSubData(master.gl.ARRAY_BUFFER, 0, new Float32Array(renderedPolygon));
    // master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.cbufferId);
    // master.gl.bufferSubData(master.gl.ARRAY_BUFFER, 0, new Float32Array(master.colors));
    // for (var i = 0; i < renderedLine.length / 4; ++i) master.gl.drawArrays(master.gl.TRIANGLE_FAN, 4 * i, 4);
    var i = 0;
    var j = 0;
    while (i < renderedPolygon.length) {
        master.gl.drawArrays(master.gl.TRIANGLE_FAN, i, master.n_poly[j])
        i += master.n_poly[j];
        j++;
    }
}