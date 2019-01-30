var size;
var matrix = new Array(size);

function initialize() {
	size = 4;
	
	var arr_row = new Array(4);	
	for(var x = 0; x < size; x++) {	
		arr_row[x] = "";
	}
	
	for(var y = 0; y < size; y++) {	
		matrix[y] = arr_row;
	}
	
	start_game();
}

function get_random_loc() {
	var max  = size-1;
	var min  = 0;
	
	var random = {x:0,y:0};
	
	do {
		
		random.x = Math.floor(Math.random() * (max - min)) + min;
		random.y = Math.floor(Math.random() * (max - min)) + min;
		//console.log("isi "+random.x+" "+random.y+" : "+matrix[random.x][random.y]);
		
	} while(matrix[random.x][random.y] != "");
		
	return random;
}

function set_cell_val(loc, val) {
	x = loc.x;
	y = loc.y;
	
	var cell = document.getElementById("cell-"+x+"-"+y);
	
	if(val == "") {
		
		cell.innerHTML = "";
		
	} else {
	
		matrix[x][y] = val;  
		
		//console.log("diisi "+val);
		
		
		cell.innerHTML = "<div class='val val-"+val+"'>"+val+"</div>";
	}
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
	
	//squeeze first 	
	//for(var x = 0; x < size; x++) {
				
		for(var y = 0; y < size; y++) {
			
			var last_empty = {x:"",y:""};

			//looking to the bottom
			for(var y1 = y; y1 < size; y1++) {
			
				var cur_val = matrix[x][y1];
				//console.log("cur_val "+x+" "+y1+" = "+cur_val);
				
				//initialize first in a column
				if(cur_val 	== "" && last_empty.x == "" && last_empty.y == "") {
					last_empty.x = x;
					last_empty.y = y1;
					console.log("last empty : "+last_empty.x+" "+last_empty.y);
				}
				
				/*
				else if(cur_val != "") {
					console.log("mengisi "+last_empty.x+" "+last_empty.y);
					matrix[last_empty.x][last_empty.y] = matrix[x][y1];
					matrix[x,y1] = "";
					
					set_cell_val(last_empty,matrix[x][y1]);
					set_cell_val({x:x,y:y1},"");
					
					last_empty.x = x;
					last_empty.y = y1;
					break;
				}
				*/
				
			}
		}
		
	//}
	
}




