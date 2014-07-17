var environment = {};
environment.shapes = {};
function createRectangle() {
    
    var newRect ={
    	height:prompt("height"),
    	length:prompt("length"),
    	x:prompt("x"),
    	y:prompt("y"),
    	
    }
    

    	
    
    $( ".droppable" ).append( '<svg><rect  id="newRectangle "width="'+ newRect.length +'" height="'+ newRect.height +'" fill="blue" x="'+ newRect.x +'" y="'+ newRect.y +'"></rect></svg>' );
 	environment["shapes"][Object.keys(environment.shapes).length] = newRect;
}



function createCircle() {
 
    var	newCircle ={
    	r: prompt("r"),
    	x:prompt("x"),
    	y:prompt("y"),
    	type:"circle"

    	
    }
    $( ".droppable" ).append( '<svg><circle  id="newCircle" cx="'+ newCircle.x + '" cy="'+ newCircle.y +'" r="'+ newCircle.r +'" fill="red" /> </svg>' );
 	environment["shapes"][Object.keys(environment.shapes).length] = newCircle;
}

function createTriangle() {
 
    var	newTriangle ={
    	point_one_x: prompt("point_one_x"),
    	point_one_y: prompt("point_one_y"),
    	point_two_x: prompt("point_two_x"),
    	point_two_y: prompt("point_two_y"),
    	point_three_x: prompt("point_three_x"),
    	point_three_y: prompt("point_three_y"),
    	type:"triangle"

    	
    }
    $( ".droppable" ).append( '<svg><polygon id="newTriangle" points="'+ newTriangle.point_one_x +','+ newTriangle.point_one_y +' '+ newTriangle.point_two_x +','+ newTriangle.point_two_y +' '+ newTriangle.point_three_x +','+ newTriangle.point_three_y +'" fill="yellow"/></svg>' );
    
 	environment["shapes"][Object.keys(environment.shapes).length] = newTriangle;
}
