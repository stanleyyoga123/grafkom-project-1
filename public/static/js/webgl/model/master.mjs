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

        this.line_move = [];
        this.line_priority = [];
        this.line_start = [];
        this.line_stop = [];
        this.lines = [];
        this.lines_color = [];
    }
}