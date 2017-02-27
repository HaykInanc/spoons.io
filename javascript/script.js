$(document).ready(function(){
	var pageV = 100,
		pageG = 100,
		mousewheelTime = 0,
		inscroll = false,
		rowLength = Math.sqrt($("section").length);

	$(".pages").css("left", -pageV + "vw");
	$(".pages").css("top", -pageG + "vh");	

	function changeBorder(){
	    $("aside div").css("border", "none");
	    $("aside div[data-x="+pageG/100+"][data-y="+pageV/100+"]").css("border", "3px solid red");
	};

	function scroll(){
	    $(".pages").animate({
	    	top: -pageV + "vh",
	    	left: -pageG + "vw"	    	
	    }, 500);
	    asideClose();
	    changeBorder();    
	};

	function asideCreate(){
		var i, j, img,
			pointPosition = new Array();

		var aside = document.createElement('aside');
		$("body").append(aside);

		for (j = 0; j <= rowLength-1; j++) {
			pointPosition[j] = [];
			for (i = 0; i <= rowLength-1; i++) {
				pointPosition[j][i] = document.createElement('div');
				img = document.createElement('img')
				pointPosition[j][i].setAttribute("data-x", i);
				pointPosition[j][i].setAttribute("data-y", j);
				img.setAttribute("src", "img/navIcons/" + (i+j*3+1) +".png")
				pointPosition[j][i].append(img)
				aside.append(pointPosition[j][i]);
			};						
		};
	}; 	

	function asideOpen(){
		var pointX, pointY;
		$("aside div").css("display", "block");
		for (i = 0; i < $("aside div").length-1; i++) {	
			pointX = $("aside div").eq(i).attr("data-x");
			pointY = $("aside div").eq(i).attr("data-y");				 
			$("aside div").eq(i).stop().stop().animate({
				left: -(2-pointX) * 80 + "px",
				top: -(2-pointY) * 80 + "px",
				opacity: 1
			}, 300)
		};
	};

	function asideClose(){
		$("aside div").stop().stop().animate({
			left: 0,
			top: 0,
			opacity: 0
		}, 300, function(){
			$("aside div").css("display", "none");
		});			
	};

	asideCreate();	

	$("aside div").on("click", function(){
		pageV = $(this).attr("data-y")*100;
		pageG = $(this).attr("data-x")*100;
		scroll();		
	});

	$('html').keydown(function(event){
	  	if (pageV >= 100 && event.keyCode == 38) {
	  		pageV -= 100;
	  	}
	  	else if (pageV <= 100 && event.keyCode == 40) {
	  		pageV += 100;
	  	}
	  	else if (pageG >= 100 && event.keyCode == 37) {
	  		pageG -= 100;
	  	}
	  	else if (pageG <= 100 && event.keyCode == 39) {
	  		pageG += 100;
	  	};
	  	scroll();
	});

	$(".pages").on("mousewheel", function(e){

		if (Math.floor(e.timeStamp/50) - mousewheelTime > 3){
			inscroll = false;
		};

		mousewheelTime = Math.floor(e.timeStamp/50);

		if (!inscroll){
			inscroll = true;
		  	if (pageV >= 100 && e.deltaY > 0) {
		  		pageV -= 100;
		  	}
		  	else if (pageV <= 100 && e.deltaY < 0) {
		  		pageV += 100;
		  	}
		  	else if (pageG >= 100 && e.deltaX < 0) {
		  		pageG -= 100;
		  	}
		  	else if (pageG <= 100 && e.deltaX > 0) {
		  		pageG += 100;
		  	};			
		  	scroll();		  	
		};
	});

	$("aside").on("click", function(){	
		if ($("aside div").css("display") == "none"){
			asideOpen();
		}
		else {				 
			asideClose();
		};	
	});


	$("body").append("<div id='modal'></div>");
	$("#modal").append("<button id='close'></button>");
	// $("#close").append("<i class='fa fa-times' aria-hidden='true'></i>");
	$("#modal").append("<div class='inform'></div>");

	$(".albums div").on("click", function(){
		var inform = $(this).children(".inset").html();
		$("#modal").css("display", "inline-block");
		$(".inform").stop().stop().animate({
			width:"80vw", 
			height:"80vh", 
			left:"10vw", 
			top:"10vh"}, 300,function(){
				$("#modal .inform").html(inform);	
				$("#close").css("display", "inline-block");
		});
	});

	$("#close").on("click", function(){
		$("#modal .inform").html("");	
		$("#close").css("display", "none");
		$(".inform").animate({
			width:"0", 
			height:"0", 
			left:"50%", 
			top:"50%"}, 300,function(){
				$("#modal").css("display", "none");
		});
	});

	$(".slider li").on("click", function(){
		if (!$(this).hasClass("active")){
			$(".slider li").removeClass("active");
			$(this).addClass("active");			
			var index = $(this).index();
			$(".slider p").stop().stop().animate({
				opacity: "0"
			}, 300, function(){
				$(".slider p").css("display", "none");
				$(".slider p").eq(index).css("display", "inline-block");
				$(".slider p").eq(index).stop().stop().animate({
					opacity: "1"
				});
			});	
		}
	});	

	function commentsPosition(){
		var elemCount = $("#comment .element").length;
		var activeIndex = $("#comment .element.active").index();
		var shiftС = 0;

		console.log(activeIndex)

		for (i=0; i <=elemCount-1; i++){
			if (i > activeIndex){
				shiftС = 50;
			};
			$("#comment .element").eq(i).css("left", i*50+shiftС+"%");
			$("#comment .element").eq(i).css("z-index", i+1);
		};
		$("#comment .element").eq(elemCount-1).css("left", "-50%");
		$("#comment .element").eq(elemCount-1).css("z-index", 0);		
	};

	commentsPosition();

});