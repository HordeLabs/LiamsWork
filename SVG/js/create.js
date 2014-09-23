var environment = {};
environment.shapes = Array();
var paper = null;
var colour = null;
var mouseX;
var mouseY;

window.onload = function() {
    // Creates canvas 1000 × 1000 at 30, 100
    
        paper = Raphael(0, 0, "100%", "100%");
        paper.canvas.style.backgroundColor = '#444';
        var t = paper.text("50%", "8%", "Horde Labs").attr({fill: "#9A9A9A","font-size": 50, "font-family":"Quicksand"});
        var button = paper.rect("1%","2%",100,50).attr({fill: "#9A9A9A",stroke: "1",stroke: '#FFF'});
        var buttonText = paper.text("5%", "6%", "Submit").attr({fill: "#FFF","font-size": 15, "font-family":"Quicksand"});
        
        var helpButton = paper.rect("91%","2%",100,50).attr({fill: "#9A9A9A",stroke: "1",stroke: '#FFF'});
        var helpText = paper.text("95%", "6%", "Help").attr({fill: "#FFF","font-size": 15, "font-family":"Quicksand"});

    	var rect = paper.rect(30, 232, 50, 50).attr({fill: "#9A9A9A",stroke: "0"}),
        circle = paper.circle(55, 200, 25).attr({fill: "#9A9A9A",stroke: "0"}),
        path = paper.path("M30,168 L55,125 L80,168 z").attr({fill: "#9A9A9A",stroke: "0"});
        
		
					
		
		
		
		
		
		
		function hover(){
			
			var test = paper.rect("87.1%", "9%", 150, 200).attr({fill: "#9A9A9A",stroke: "1",stroke: '#FFF'});
			var instruction = paper.text("93%", "13.5%", "Clicking the shapes on\n the left produces a\n clone in the centre of\n the paper.\n \n Right clicking on an\n added shape will open\n a context menu.\n \n Click Submit to store\n your environment.").attr({fill: "#FFF","font-size": 12, "font-family":"Quicksand"});

			
			helpButton.mouseout(function(){
				test.remove();
				instruction.remove();
				
			});
			
		}
		
		function buttonSelect(){
			
			button.attr({stroke:"1",stroke:"#000"});
    		button.mouseout(function(){
				button.attr({stroke:"1",stroke:"#FFF"});
				
			});
		}
	
		button.click(function() 
		{
    		
    		go();
		});
		button.mouseover(function() 
		{
    		
		buttonSelect();
    		
		});
		
		
		
		buttonText.mouseover(function() 
		{
    		buttonSelect();
		});
		buttonText.click(function() 
		{
    		go();
		});
	
		helpButton.mouseover(function(){
			
			hover();
		});
		helpText.mouseover(function(){
			
			hover();
			
		});
		
    var start = function(){ // function for the start of the drag
            this.ox = this.attrs.x;
            this.oy = this.attrs.y;
            this.lastdx ? this.ox += this.lastdx : this.ox = 0;
            this.lastdy ? this.oy += this.lastdy : this.oy = 0;
            //console.log(this);
            this.attrs.class = "added";
           this.attr('class','context');
           
        		  		
        		
            
            if(!this.clonedShape){ // if this shape is a clone then we don't want to create a new one
                var cloned = this.clone();
                cloned.drag(move, start, up);
                this.clonedShape = true;
            }
            this.translate(500,150);

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
                selected.subject.attr({stroke: '#FFF', "stroke-width": "1.5"});
                
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


function pick(){//sets position of context menu based on mouse xy
	mouseX = event.pageX;
  	mouseY = event.pageY;
 	$("#box").css({'top':mouseY,'left':mouseX});
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


$(document).mouseup(function (e)
{
    var menu_close = $(".context_menu");

    if (!menu_close.is(e.target) // if the target of the click isn't the container...
        && menu_close.has(e.target).length === 0) // ... nor a descendant of the container
    {
        menu_close.hide();
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
    mouseX = event.pageX;
  	mouseY = event.pageY;
 	$(".context_menu").css({'top':mouseY,'left':mouseX});
    $(".context_menu").show();
    $(".show_options").hide();
    $(".rotate_option").hide();
       
        return false;
        }
});
});

$(document).ready(function(){

$(document).on("mousedown", "circle,rect,path",function(e){
    
    if (e.which == 1 && e.ctrlKey){
    e.cancelBubble = true;
    e.preventDefault();
    e.stopPropagation();
    selected.subject.attr({stroke: 'red'}); 
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
	
	copyKeep();
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
		cloned.attrs.class = "added";
		$(".context_menu").hide();
	
	if(selected.freeTransform){
        	selected.freeTransform.unplug();
    } 
    else {
        		selected.unplug();
    	}
    	selected.subject.remove();
	
	
}




function openOptions(){
	if($(".show_options").css("display")=="none"){
	$(".show_options").show();
	}
	else{
		$(".show_options").hide();
	}
}
function copyRemove(){
	var cloned =selected.subject.clone();
	if(selected.freeTransform){
        selected.freeTransform.unplug();
    } else {
        selected.unplug();
    }
    selected.subject.remove();

	ft = paper.freeTransform(cloned, { keepRatio: true	}, function(element){
                
                selected = element;
               
                paper.forEach(function(e){
                    e.attr({stroke: false});
                })
                selected.subject.attr({stroke: '#FFF', "stroke-width": "1"});

                
            }).showHandles().apply();
            cloned.attrs.class = "added";
	
	
}
function copyKeep(){
	var cloned =selected.subject.clone();


	ft = paper.freeTransform(cloned, { keepRatio: true	}, function(element){
                
                selected = element;
               
                paper.forEach(function(e){
                    e.attr({stroke: false});
                })
                selected.subject.attr({stroke: '#FFF', "stroke-width": "1"});

                
            }).showHandles().apply();
            cloned.attrs.class = "added";
	
	
}
function rotate45(){
		copyRemove();
             ft.attrs.rotate = ft.attrs.rotate+ 45;
             $(".context_menu").hide();

	
}
function rotate90(){
		copyRemove();
             ft.attrs.rotate = ft.attrs.rotate+ 90;
             $(".context_menu").hide();

	
}
function openRotate(){
	if($(".rotate_option").css("display")=="none"){
	$(".rotate_option").show();
	}
	else{
		$(".rotate_option").hide();
	}
}


