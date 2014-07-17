var environment = {};
environment['shapes'] = {};
window.onload = function () {
             // Creates canvas 1000 × 1000 at 30, 100
var paper = Raphael(30, 100, 1000, 1000);

var rect1 = paper.rect(0, 0, 1000, 1000);
rect1.attr({fill: "#444"});

//Create shapes
var rect = paper.rect(55, 130, 50, 50);
rect.attr({fill: "#34C8FF",stroke:"0" });

var circle = paper.circle(80, 100, 25);
circle.attr({fill: "#34C8FF",stroke:"0"});

var path = paper.path("M50,68 L77,23 L105,68 z");
path.attr({fill: "#34C8FF",stroke:"0"});




circle.click(function (e) //Onclick create object
{
		var cloned = circle.clone(); 
	  var length = environment['shapes'].length > 0 ? environment['shapes'].length : 0; 
    	newCircle ={
    	r: cloned.attr("r"),
    	x:cloned.attr("cx"),
    	y:cloned.attr("cy"),
    	type:"circle",
    	id: "circle" + length

    	
    }
	
						
	var ft = paper.freeTransform(cloned);//Add handles to clone
   
  	ft.showHandles();
	ft.apply();
	ft = paper.freeTransform(cloned, { keepRatio: true	}, function(ft, events) {console.log(ft, event)});
    ft.setOpts({ keepRatio: false }, function(e){environment['shapes'][e.id] = e});
    
    
    
	environment["shapes"][Object.keys(environment.shapes).length] = newCircle;
		
});



rect.click(function (e) //Onclick create object
{
var	newRectangle ={
    	
    	x:rect.attr("x"),
    	y:rect.attr("y"),
    	height: rect.attr("height"),
    	width: rect.attr("width"),
    	type:"rectangle"

    	
    }
   
	var cloned = rect.clone();					
	var ft = paper.freeTransform(cloned);//Add handles to clone
    ft.showHandles();
	ft.apply();
	    ft = paper.freeTransform(cloned, { keepRatio: true }, function(ft, events) {

    });
    ft.setOpts({ keepRatio: false });
					environment["shapes"][Object.keys(environment.shapes).length] = newRectangle;
			
});



path.click(function (e) //Onclick create object
{
var	newPath ={
    	
    	x:0,
    	y:0,
    	height: 0,
    	width: 0,
    	type:"path"

    	
    }
   
	var cloned = path.clone();					
	var ft = paper.freeTransform(cloned);//Add handles to clone
    ft.showHandles();
	ft.apply();
	    ft = paper.freeTransform(cloned, { keepRatio: true }, function(ft, events) {

    });
    ft.setOpts({ keepRatio: false });
					environment["shapes"][Object.keys(environment.shapes).length] = newPath;
			
});

circle.drag(function (e) //Onclick create object
{


		newCircle ={
    	r: cloned.attr("r"),
    	x:cloned.attr("cx"),
    	y:cloned.attr("cy"),
    	type:"circle"

    	
    }

});


};

 