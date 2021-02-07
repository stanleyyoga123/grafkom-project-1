export class Master {
    constructor() {
        this.canvas;
        this.gl; 

        this.bufferId;
        this.cbufferId;

        this.mouseClicked = false;

        this.points = [];
        this.colors = [];
        this.lineColor = [0, 0, 0];

        // For Line
        this.lines = [];
        this.line_move = [];
        this.line_priority = [];
        this.line_start = [];
        this.line_stop = [];
        this.lines_color = [];

        // For Square
        this.squares = [];
        this.square_start = [];
        this.square_end = []; 

        // For Polygon
        this.polygons = [];
        this.n_poly = [];
        this.cur_poly = [];
        this.cur_n_poly = 0;
    }
}