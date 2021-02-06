export function rectangleVertex(point) {
    const width = 0.003;
    return [
        point[0]-width, point[1]-width,
        point[0]-width, point[1]+width,
        point[0]+width, point[1]+width,
        point[0]+width, point[1]-width,
    ];
}