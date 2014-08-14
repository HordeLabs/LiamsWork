var environment = {};
environment.shapes = Array();

window.onload = function() {
    // Creates canvas 1000 × 1000 at 30, 100
    var paper = Raphael(30, 100, 1000, 1000),
        //rect1 = paper.rect(0, 0, 1000, 1000).attr({fill: "#444"}),
        rect = paper.rect(55, 130, 50, 50).attr({fill: "#34C8FF",stroke: "0"});
        circle = paper.circle(80, 100, 25).attr({fill: "#34C8FF",stroke: "0"});
        path = paper.path("M50,68 L77,23 L105,68 z").attr({fill: "#34C8FF",stroke: "0"});

    var start = function(){ // function for the start of the drag
            this.ox = this.attrs.x;
            this.oy = this.attrs.y;
            this.lastdx ? this.ox += this.lastdx : this.ox = 0;
            this.lastdy ? this.oy += this.lastdy : this.oy = 0;
            if(!this.clonedShape){ // if this shape is a clone then we don't want to create a new one
                var cloned = this.clone();
                cloned.drag(move, start, up);
                this.cloneedShape = true;
            }
            
    },
        move = function(dx, dy){ // function for the move event
            this.transform("T" + (dx + this.ox) + "," + (dy + this.oy));
            this.lastdx = dx;
            this.lastdy = dy;

            environment.shapes[this.id] = this;
    },
        up = function(){ // function for when the dragends
            var ft = paper.freeTransform(this, {
                keepRatio: true // not working?
            }, function(e){
                environment.shapes[this.id] = this;
            }).showHandles().apply(); 
            console.log(environment.shapes)
    };
    paper.set(rect,circle,path)
    rect.drag(move, start, up);
    circle.drag(move, start, up);
    path.drag(move, start, up);
};