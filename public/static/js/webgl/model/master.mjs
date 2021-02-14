import {render} from './../render.mjs';

export class Master {
    constructor() {
        this.canvas;
        this.gl; 

        this.bufferId;
        this.cbufferId;

        this.mouseClicked = false;

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
        this.square_start = [];
        this.square_end = []; 

        // For Polygon
        this.polygons = [];
        this.polygons_move = [];
        this.polygons_color = [];
        this.n_poly = [];
        this.cur_poly = [];
        this.cur_n_poly = 0;
        this.start_poly = false;
    }

    loadJSONData(data){
        // Current Color
        this.cur_color = data.cur_color;

        // For Line
        this.lines = data.lines;
        this.line_move = data.line_move;
        this.line_start = data.line_start;
        // this.line_stop = [];
        this.lines_color = data.lines_color;

        // For Square
        this.squares = data.squares;
        this.squares_color = data.squares_color;
        this.square_move = data.square_move;
        this.square_start = data.square_start;
        this.square_end = data.square_end; 

        // For Polygon
        this.polygons = data.polygons;
        this.polygons_move = data.polygons_move;
        this.polygons_color = data.polygons_color;
        this.n_poly = data.n_poly;
        this.cur_poly = data.cur_poly;
        this.cur_n_poly = data.cur_n_poly;
        this.start_poly = data.start_poly;

        alert(`data from ${data} loaded!`);
        render(this);
    }                                                                                                                                                                                                                       
}