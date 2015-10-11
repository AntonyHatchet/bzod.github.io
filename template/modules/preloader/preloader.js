define({
	renderProgress: function (progress) {
	    progress = Math.floor(progress);
	    
	    if(progress<25){
	        var angle = -90 + (progress/100)*360;
	        $(".animate-0-25-b").css("transform","rotate("+angle+"deg)");
	        $(".loader-image-1").css("display","block");
	    }
	    else if(progress>=25 && progress<50){
	        var angle = -90 + ((progress-25)/100)*360;
	        $(".animate-0-25-b").css("transform","rotate(0deg)");
	        $(".animate-25-50-b").css("transform","rotate("+angle+"deg)");
	        $(".loader-image-1").css("display","none");
	        $(".loader-image-2").css("display","block");
	    }
	    else if(progress>=50 && progress<75){
	        var angle = -90 + ((progress-50)/100)*360;
	        $(".animate-25-50-b, .animate-0-25-b").css("transform","rotate(0deg)");
	        $(".animate-50-75-b").css("transform","rotate("+angle+"deg)");
	        $(".loader-image-2").css("display","none");
	        $(".loader-image-3").css("display","block");
	    }
	    else if(progress>=75 && progress<=100){
	        var angle = -90 + ((progress-75)/100)*360;
	        $(".animate-50-75-b, .animate-25-50-b, .animate-0-25-b").css("transform","rotate(0deg)");
	        $(".animate-75-100-b").css("transform","rotate("+angle+"deg)");
	        $(".loader-image-3").css("display","none");
	        $(".loader-image-4").css("display","block");
	    }
	    if(progress==100){
	    }
	    $(".text").html('<span>'+progress+"</span>%");
	}
});