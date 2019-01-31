var size = 4;
var matrix = new Array(size);

function initialize() {
	
	for(var x = 0; x < size; x++) {	
		matrix[x] = new Array(size).fill(0);
	}
		
	start_game();
}

function get_random_loc() {
	var max  = size;
	var min  = 0;
	
	var random = {x:0,y:0};
	
	do {
		
		random.x = Math.floor(Math.random() * (max - min)) + min;
		random.y = Math.floor(Math.random() * (max - min)) + min;
				
	} while(matrix[random.x][random.y] != 0);
		
	return random;
}

function set_cell_val(loc, val) {
	x = loc.x;
	y = loc.y;
	
	var cell = document.getElementById("cell-"+x+"-"+y);
	
	if(val == "" || val == undefined) {
		
		cell.innerHTML = "";
		
	} else {
	
		matrix[x][y] = val;  
		
		//console.log("Pengisian "+x+" "+y+" : "+val);
		
		cell.innerHTML = "<div class='val val-"+val+"'>"+val+"</div>";
	}
}

function rem_cell_val(x, y) {
	matrix[x][y] = "x";
	
	var cell 		= document.getElementById("cell-"+x+"-"+y);
	cell.innerHTML 	= "";
}

function start_game() {
	
	var game_canvas = document.getElementById("game-canvas"); 
	game_canvas.innerHTML 	= "";
	
	
	for(var y = 0; y < size; y++) {
		
		game_canvas.innerHTML = game_canvas.innerHTML + "<div class='row' id='row-"+y+"'></div>";
		var game_canvas_row = document.getElementById("row-"+y);
		
		for(var x = 0; x < size; x++) {
			
			game_canvas_row.innerHTML = game_canvas_row.innerHTML + "<div class='cell' id='cell-"+y+"-"+x+"'>";
			
		}
		
	}
	
	//place first two items 
	set_cell_val(get_random_loc(),2);
	set_cell_val(get_random_loc(),2);
	
}


function slide_up() {
	
		for(var y=0; y<size; y++) {
			
			for(var x = 1; x < size; x++) {
				
				cursor = x;
				
				do {
					
					if(matrix[cursor][y] == 0 && matrix[cursor-1][y] == 0) {
						
						break;
						
					} else if(matrix[cursor][y] > 0 && matrix[cursor-1][y] == 0) {
						
						//shift
						matrix[cursor-1][y] = matrix[cursor][y];
						
						set_cell_val({"x":cursor-1,"y":y},matrix[cursor-1][y]);
						rem_cell_val(cursor,y);
						
						matrix[cursor][y]   = 0;
						
						
					} else if(matrix[cursor][y] > 0 && matrix[cursor][y] == matrix[cursor-1][y]) {
						
						//merge
						matrix[cursor-1][y] = matrix[cursor-1][y] + matrix[cursor][y];
						
						set_cell_val({"x":cursor-1,"y":y},matrix[cursor-1][y]);
						rem_cell_val(cursor,y);
						
						matrix[cursor][y]   = 0;
						
						break;
						
					}
					
					cursor--;
					
				} while(cursor > 0);
			}
		}
		
	set_cell_val(get_random_loc(),2);
		
}


function slide_down() {
	
		for(var y=0; y<size; y++) {
			
			
			for(var x = size-2; x >= 0; x--) {
				
				cursor = x;
				
				do {
					
					if(matrix[cursor][y] == 0 && matrix[cursor+1][y] == 0) {
						
						break;
						
					} else if(matrix[cursor][y] > 0 && matrix[cursor+1][y] == 0) {
						
						//shift
						matrix[cursor+1][y] = matrix[cursor][y];
						
						set_cell_val({"x":cursor+1,"y":y},matrix[cursor+1][y]);
						rem_cell_val(cursor,y);
						
						matrix[cursor][y]   = 0;
						
						
					} else if(matrix[cursor][y] > 0 && matrix[cursor][y] == matrix[cursor+1][y]) {
						
						//merge
						matrix[cursor+1][y] = matrix[cursor+1][y] + matrix[cursor][y];
						
						set_cell_val({"x":cursor+1,"y":y},matrix[cursor+1][y]);
						rem_cell_val(cursor,y);
						
						matrix[cursor][y]   = 0;
						
						break;
						
					}
					
					cursor++;
					
				} while(cursor < size-1);
			}
		}
		
	set_cell_val(get_random_loc(),2);
		
}


function slide_left() {
				
		for(var x = 0; x < size; x++) {
			
			for(var y=1; y<size; y++) {
				
				cursor = y;
				
				do {
					
					if(matrix[x][cursor] == 0 && matrix[x][cursor-1] == 0) {
						
						break;
						
					} else if(matrix[x][cursor] > 0 && matrix[x][cursor-1] == 0) {
						
						//shift
						matrix[x][cursor-1] = matrix[x][cursor];
						
						set_cell_val({"x":x,"y":cursor-1},matrix[x][cursor-1]);
						rem_cell_val(x,cursor);
						
						matrix[x][cursor]   = 0;
						
						
					} else if(matrix[x][cursor] > 0 && matrix[x][cursor] == matrix[x][cursor-1]) {
						
						//merge
						matrix[x][cursor-1] = matrix[x][cursor-1] + matrix[x][cursor];
						
						set_cell_val({"x":x,"y":cursor-1},matrix[x][cursor-1]);
						rem_cell_val(x,cursor);
						
						matrix[x][cursor]   = 0;
						
						break;
						
					}
					
					cursor--;
					
				} while(cursor > 0);
			}
		}
		
	set_cell_val(get_random_loc(),2);
		
}


function slide_right() {
	
		for(var x=0; x<size; x++) {
						
			for(var y = size-2; y >= 0; y--) {
				
				cursor = y;
				
				do {
					
					if(matrix[x][cursor] == 0 && matrix[x][cursor+1] == 0) {
						
						break;
						
					} else if(matrix[x][cursor] > 0 && matrix[x][cursor+1] == 0) {
						
						//shift
						matrix[x][cursor+1] = matrix[x][cursor];
						
						set_cell_val({"x":x,"y":cursor+1},matrix[x][cursor+1]);
						rem_cell_val(x,cursor);
						
						matrix[x][cursor]   = 0;
						
						
					} else if(matrix[x][cursor] > 0 && matrix[x][cursor] == matrix[x][cursor+1]) {
						
						//merge
						matrix[x][cursor+1] = matrix[x][cursor+1] + matrix[x][cursor];
						
						set_cell_val({"x":x,"y":cursor+1},matrix[x][cursor+1]);
						rem_cell_val(x,cursor);
						
						matrix[x][cursor]   = 0;
						
						break;
						
					}
					
					cursor++;
					
				} while(cursor < size-1);
			}
		}
		
	set_cell_val(get_random_loc(),2);
		
}







