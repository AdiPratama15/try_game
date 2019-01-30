var size = 4;
var matrix = new Array(size);

function initialize() {
	
	for(var x = 0; x < size; x++) {	
		matrix[x] = new Array(size).fill("x");
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
				
	} while(matrix[random.x][random.y] != "x");
		
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
			
			var pointer = -1;
		
			//looking to the bottom
			for(var x = 0; x < size; x++) {
			
				var cur_val = matrix[x][y];
				
				if(cur_val 	== "x" && 0 > pointer) {
					
					//point to last empty
					pointer = x;
					//console.log("pointer : "+x);
				
							
				} else if (cur_val != "x" && x < size-1 && cur_val == matrix[x+1][y]) {
											
							
						//merge next
						set_cell_val({"x":x,"y":y},cur_val*2);
						rem_cell_val(x+1,y);
						
						matrix[x+1][y] = "x";
						
						pointer = x+1;
							
					
				} else if (cur_val 	!= "x" && pointer >= 0) {
					
					
					if(cur_val == matrix[pointer][y]) {
						
						//merge jump
						set_cell_val({"x":pointer-1,"y":y},cur_val*2);
						rem_cell_val(x,y);
						
						matrix[x][y] = "x";
						
						pointer = x;
						
					}  else {
						
						//shift
						set_cell_val({"x":pointer,"y":y},cur_val);
						rem_cell_val(x,y);
						
						matrix[x][y] = "x";
						
						pointer++;
					}
				}
				
			}
		
		}
		
		set_cell_val(get_random_loc(),2);
}




