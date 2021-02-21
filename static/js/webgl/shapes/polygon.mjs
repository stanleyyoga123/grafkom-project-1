function renderPolygon(master) {
    var renderedPolygon = [];
    var colors = [];
    if (master.cur_n_poly > 2) {
        var cur_color = [];
        for (var i = 0; i < master.cur_n_poly; ++i) master.cur_color.forEach(el => cur_color.push(el));
        
        // console.log(master.cur_poly);
        // console.log(master.cur_n_poly);

        master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.bufferId);
        master.gl.bufferSubData(master.gl.ARRAY_BUFFER, 0, new Float32Array(master.cur_poly));
        master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.cbufferId);
        master.gl.bufferSubData(master.gl.ARRAY_BUFFER, 0, new Float32Array(cur_color));
        master.gl.drawArrays(master.gl.TRIANGLE_FAN, 0, master.cur_n_poly);
    }

    for (var i = 0; i < master.polygons.length; ++i) {
        for (var j = 0; j < master.polygons[i].length; ++j) {
            renderedPolygon.push(master.polygons[i][j]);
        }
    }
    master.polygons_color.forEach(el => colors.push(el));

    master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.bufferId);
    master.gl.bufferSubData(master.gl.ARRAY_BUFFER, 0, new Float32Array(renderedPolygon));
    master.gl.bindBuffer(master.gl.ARRAY_BUFFER, master.cbufferId);
    master.gl.bufferSubData(master.gl.ARRAY_BUFFER, 0, new Float32Array(colors));
    var i = 0;
    var j = 0;
    while (i < renderedPolygon.length/2) {
        master.gl.drawArrays(master.gl.TRIANGLE_FAN, i, master.n_poly[j])
        i += master.n_poly[j];
        j++;
    }
}