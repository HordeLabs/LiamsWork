var environment = {};
environment.shapes = Array();
var paper = null;
var colour = null;

window.onload = function() {
    // Creates canvas 1000 × 1000 at 30, 100
    
        paper = Raphael(30, 110, 1100, 500);
        paper.canvas.style.backgroundColor = '#444';
    var rect = paper.rect(55, 130, 50, 50).attr({fill: "#34C8FF",stroke: "0"}),
        circle = paper.circle(80, 100, 25).attr({fill: "#34C8FF",stroke: "0"}),
        path = paper.path("M50,68 L77,23 L105,68 z").attr({fill: "#34C8FF",stroke: "0"});
		
		


    var start = function(){ // function for the start of the drag
            this.ox = this.attrs.x;
            this.oy = this.attrs.y;
            this.lastdx ? this.ox += this.lastdx : this.ox = 0;
            this.lastdy ? this.oy += this.lastdy : this.oy = 0;
            // console.log(this);
            this.attrs.class = "added";
           this.attr('class','context');
           
        		  		
        		
            
            if(!this.clonedShape){ // if this shape is a clone then we don't want to create a new one
                var cloned = this.clone();
                cloned.drag(move, start, up);
                this.cloneedShape = true;
            }
            this.translate(400,200);

    },
        move = function(dx, dy){ // function for the move event
            this.transform("T" + (dx + this.ox) + "," + (dy + this.oy));
            this.lastdx = dx;
            this.lastdy = dy;

            // environment.shapes[this.id] = this;
    },
        up = function(){ // function for when the dragends
            var ft = paper.freeTransform(this, {
                keepRatio: true // not working?
            }, function(element){
                
                selected = element;
               
                paper.forEach(function(e){
                    e.attr({stroke: false});
                })
                selected.subject.attr({stroke: '#FFF', "stroke-width": "1"});
                
            }).showHandles().apply();
            // console.log(environment.shapes)
    };
    paper.set(rect,circle,path)
    rect.drag(move, start, up);
    circle.drag(move, start, up);
    path.drag(move, start, up);
	};

function go(){
    environment.shapes = Array();
    paper.forEach(function(e){
        if(e.attrs.class == "added"){
            environment.shapes.push({
                "type" : e.type,
                "atts" : e.attrs,
                "matrix" : e.matrix.split()
            });
        }
    });
    console.clear();
    console.log(JSON.stringify(environment.shapes));
    
}


function pick(){
	
	$("#box").show();
}

$(document).mouseup(function (e)
{
    var container = $("#box");

    if (!container.is(e.target) // if the target of the click isn't the container...
        && container.has(e.target).length === 0) // ... nor a descendant of the container
    {
        container.hide();
    }
});


function change_colour(element){
			
	colour = $(element).css( 'backgroundColor' );
	shapeOnClick();
	$("#picker").hide();
	$("#box").hide();
}





$(document).ready(function(){

$(document).on("mousedown", "circle,rect,path",function(e){
    
    if (e.which == 3){
    e.cancelBubble = true;
    e.preventDefault();
    e.stopPropagation();
    $(".context_menu").show();
   

    

       
        return false;
        }
});
});




function deleteItem(){
	if(selected.freeTransform){
        selected.freeTransform.unplug();
    } else {
        selected.unplug();
    }
    selected.subject.remove();
	 $(".context_menu").hide();
}
function duplicateItem(){
var cloned =selected.subject.clone();
	ft = paper.freeTransform(cloned, { keepRatio: true	}, function(element){
                
                selected = element;
               
                paper.forEach(function(e){
                    e.attr({stroke: false});
                })
                selected.subject.attr({stroke: '#FFF', "stroke-width": "1"});
                
            }).showHandles().apply();
;
	selected.subject.attrs.class = "added";

	$(".context_menu").hide();
	
}


function shapeOnClick()
{

	
                selected.subject.attr({"fill": colour});	
                $(".context_menu").hide();
                
}


function sendBack(){
	selected.subject.toBack()+1;
	$(".context_menu").hide();
}
function sendFront(){
	selected.subject.toFront();
	$(".context_menu").hide();
}

function hideHandle(){
var cloned =selected.subject.clone();
	ft = paper.freeTransform(cloned, { keepRatio: true	}, function(element){
                
                selected = element;
               
                paper.forEach(function(e){
                    e.attr({stroke: false});
                })
                selected.subject.attr({stroke: '#FFF', "stroke-width": "1"});
                
            }).hideHandles().apply();
;
	selected.subject.attrs.class = "added";
	$(".context_menu").hide();

if(selected.freeTransform){
        selected.freeTransform.unplug();
    } else {
        selected.unplug();
    }
    selected.subject.remove();
	 $(".context_menu").hide();
	
}


function showHandle(){
var cloned =selected.subject.clone();
	ft = paper.freeTransform(cloned, { keepRatio: true	}, function(element){
                
                selected = element;
               
                paper.forEach(function(e){
                    e.attr({stroke: false});
                })
                selected.subject.attr({stroke: '#FFF', "stroke-width": "1"});
                
            }).showHandles().apply();
;

	$(".context_menu").hide();

if(selected.freeTransform){
        selected.freeTransform.unplug();
    } else {
        selected.unplug();
    }
    selected.subject.remove();
	 $(".context_menu").hide();
	
}
