export class Master {
    constructor() {
        this.canvas;
        this.gl; 

        this.bufferId;
        this.cbufferId;

        this.mouseClicked = false;

        this.points = [];
        this.colors = [];

        // Current Color
        this.cur_color = [0, 0, 0];

        // For Line
        this.lines = [];
        this.line_move = [];
        this.line_start = [];
        // this.line_stop = [];
        this.lines_color = [];

        // For Square
        this.squares = [];
        this.squares_color = [];
        this.square_move = [];
        // this.square_start = [];
        // this.square_end = []; 

        // For Polygon
        this.polygons = [];
        this.polygons_color = [];
        this.n_poly = [];
        this.cur_poly = [];
        this.cur_n_poly = 0;
        this.start_poly = false;
    }

    loadJSONData(data){
        this.points = [];
        this.colors = [];
        this.lineColor = [0, 0, 0];

        // For Line
        this.lines = [];
        this.line_move = [];
        this.line_start = [];
        this.lines_color = [];

        // For Square
        this.squares = [];
        this.square_start = [];
        this.square_end = []; 
        this.square_start = [];
        this.square_stop = [];
        this.squares_color = [];

        // For Polygon
        this.polygons = [];
        this.n_poly = [];
        this.cur_poly = [];
        this.cur_n_poly = 0;
        this.start_poly = false;

        alert(`data from ${data} loaded!`);
    }                                                                                                                                                                                                                       
}