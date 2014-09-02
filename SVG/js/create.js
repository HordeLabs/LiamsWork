var environment = {};
environment.shapes = Array();
var paper = null;
window.onload = function() {
    // Creates canvas 1000 × 1000 at 30, 100
    
        paper = Raphael(30, 100, 1000, 1000);
    var rect1 = paper.rect(0, 0, 1000, 1000).attr({fill: "#444"}),
    	rect = paper.rect(55, 130, 50, 50).attr({fill: "#34C8FF",stroke: "0"}),
        circle = paper.circle(80, 100, 25).attr({fill: "#34C8FF",stroke: "0"}),
        path = paper.path("M50,68 L77,23 L105,68 z").attr({fill: "#34C8FF",stroke: "0"});
		
		$('#picker').colpick({
			layout:'hex',
			submit:0,
			colorScheme:'light',
			onChange:function(hsb,hex,rgb,el,bySetColor) {
				$(el).css('border-color','#'+hex);
				if(!bySetColor) $(el).val(hex);
			}
		}).keyup(function(){
		$(this).colpickSetColor(this.value);
		});


    var start = function(){ // function for the start of the drag
            this.ox = this.attrs.x;
            this.oy = this.attrs.y;
            this.lastdx ? this.ox += this.lastdx : this.ox = 0;
            this.lastdy ? this.oy += this.lastdy : this.oy = 0;
            // console.log(this);
            this.attrs.class = "added";
        		        		
        		
            //this.setAttribute("class", "added");
            if(!this.clonedShape){ // if this shape is a clone then we don't want to create a new one
                var cloned = this.clone();
                cloned.drag(move, start, up);
                this.cloneedShape = true;
            }
            this.translate(550,200);

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
                console.log(element);
                selected = element;
                paper.forEach(function(e){
                    e.attr({stroke: false});
                })
                selected.subject.attr({stroke: '#FFF', "stroke-width": "3"});
                var colour =$("#picker").css( 'border-right-color' );
                console.log(colour);
                selected.subject.attr({"fill": colour});
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
    console.log(environment.shapes);
}
$(document).ready(function(){

$('#close').on('click', function () {
	if(selected.freeTransform){
        selected.freeTransform.unplug();
    } else {
        selected.unplug();
    }
    selected.subject.remove();
	
    
	
});
});
function shapeOnClick()
{

	var colour =$("#picker").css( 'border-color' );
	$(selected).attr({fill:colour});	
}

