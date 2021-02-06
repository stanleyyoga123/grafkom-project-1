export function hex2dec(n) {
    return parseInt(n,16).toString(10)
} 

export function rotate(ax, ay, bx, by, angle) {
    var rad = (Math.PI / 180) * angle,
        cos = Math.cos(rad),
        sin = Math.sin(rad),
        run = bx - ax,
        rise = by - ay,
        cx = (cos * run) + (sin * rise) + ax,
        cy = (cos * rise) - (sin * run) + ay;
    return [cx, cy];
}
  
export function distance(x1, y1, x2, y2) {
    return Math.sqrt((Math.pow(x1-x2, 2)+Math.pow(y1-y2, 2)))
}