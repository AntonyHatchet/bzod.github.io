define({
	renderPreloader: function() {
		return this.preloaderHtml;
	},
	renderProgress: function (progress) {
		progress = Math.floor(progress);

		var angle;
		if(progress<25){
			angle = -90 + (progress/100)*360;
			this.preloaderHtml.find(".animate-0-25-b").css("transform","rotate("+angle+"deg)");
			this.preloaderHtml.find(".loader-image-1").css("display","block");
		}
		else if(progress>=25 && progress<50){
			angle = -90 + ((progress-25)/100)*360;
			this.preloaderHtml.find(".animate-0-25-b").css("transform","rotate(0deg)");
			this.preloaderHtml.find(".animate-25-50-b").css("transform","rotate("+angle+"deg)");
			this.preloaderHtml.find(".loader-image-1").css("display","none");
			this.preloaderHtml.find(".loader-image-2").css("display","block");
		}
		else if(progress>=50 && progress<75){
			angle = -90 + ((progress-50)/100)*360;
			this.preloaderHtml.find(".animate-25-50-b, .animate-0-25-b").css("transform","rotate(0deg)");
			this.preloaderHtml.find(".animate-50-75-b").css("transform","rotate("+angle+"deg)");
			this.preloaderHtml.find(".loader-image-2").css("display","none");
			this.preloaderHtml.find(".loader-image-3").css("display","block");
		}
		else if(progress>=75 && progress<=100){
			angle = -90 + ((progress-75)/100)*360;
			this.preloaderHtml.find(".animate-50-75-b, .animate-25-50-b, .animate-0-25-b").css("transform","rotate(0deg)");
			this.preloaderHtml.find(".animate-75-100-b").css("transform","rotate("+angle+"deg)");
			this.preloaderHtml.find(".loader-image-3").css("display","none");
			this.preloaderHtml.find(".loader-image-4").css("display","block");
		}
		if(progress==100){
		}
		this.preloaderHtml.find(".text").html('<span>'+progress+"</span>%");
	},

	clearInterval: function(){
		

//console.log('clearInterval');
		this.preloaderHtml.find('.animate-75-100-b, .animate-50-75-b, .animate-25-50-b, .animate-0-25-b').css("transform","rotate(90deg)");
		this.preloaderHtml.find('.text').html('<span>0</span>%');
		this.preloaderHtml.find('.loader-image-4').css("display","none");
		this.preloaderHtml.remove();
		this.trigger('Preload:End');
	},

	preloadImage: function(timer){
		var self = this;
		var images = this.content.find("img");
//		

//console.log("all images on the page", images);
		var counter = 0;
		var procent = 100/images.length;


		var j = 0;

		setInterval(function () {
		    j++;
			if (j <= 98) {
			   	self.renderProgress(j);
		   	}else
		    if (j === 99) {
			    // if(counter === images.length){
			        width = '4px';
					self.preloaderHtml.find('.text').animate({
						opacity : 0.5
					}, 'slow');
					self.preloaderHtml.find('.loader-spiner').animate({
						borderLeftWidth: width,
						borderTopWidth: width,
						borderRightWidth: width,
						borderBottomWidth: width
					}, 13 );
					setTimeout(function(){
						self.clearInterval();
					}, 15);
				// }
		    }
		}, timer);

		images.on("load", function (event) {
			counter ++;
		});

		// images.on("load", function (event) {
		// 	counter ++;
		// 	

//console.log('image loaded');
		// 	self.renderProgress((counter*procent));
		// 	if( counter >= images.length ) {
		// 		width = '4px';
		// 		self.preloaderHtml.find('.text').animate({
		// 			opacity : 0.5
		// 		}, 'slow');
		// 		self.preloaderHtml.find('.loader-spiner').animate({
		// 			borderLeftWidth: width,
		// 			borderTopWidth: width,
		// 			borderRightWidth: width,
		// 			borderBottomWidth: width
		// 		}, 1300 );
		// 		setTimeout(function(){
		// 			self.clearInterval();
		// 		}, 1500);
		// 	}
		// });
	}
});