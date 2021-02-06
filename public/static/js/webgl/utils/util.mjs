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
  