define({
	render: function() {
		this.preloader = this.preloader.find('#preloader');
		this.content = this.html.find('#mainScreen');

		$('body').html('').append(this.preloader);
		$('body').append(this.content);
		//console.log(this)
		this.preloadImage();
		this.subscribe();
	},
	preloadImage: function(){
		var self = this;
		var images = this.content.find("img");
		var counter = 0;
		var procent = 100/images.length;

		images.on("load", function (event) { 
		        counter ++;
		        if( counter >= images.length ) {
		            // clearProgress();
		            width = '4px';
		            $('.text').animate({
		            	opacity : 0.5
		            }, 'slow');
		        	$('.loader-spiner').animate({
		        		borderLeftWidth: width,
						borderTopWidth: width,
						borderRightWidth: width,
						borderBottomWidth: width
					}, 1300 );
					setTimeout(function(){
						$('#preloader').remove();
						self.animate();
					},1500)
		        }
		        self.preloaderJs.renderProgress((counter*procent));
		});
	},
	subscribe: function() {
		var self = this;

		// this.preloaderJs.init();
		this.content.find('#game').on('click', function(e) {
			e.preventDefault();
			self.route('gallery',['preloader','accordion']);
		});
	 },
	animate: function(){
		var self = this;
			self.timer('img:nth-child(8)',0);
			self.timer('img:nth-child(9)',1000);
			self.timer('img:nth-child(5)',1200);
			self.timer('img:nth-child(7)',1200);
			self.timer('img:nth-child(4)',2000);
			self.timer('img:nth-child(6)',2000);
			self.timer('img:nth-child(10)',2000);
			self.timer('img:nth-child(2)',2120);
			self.timer('img:nth-child(3)',3080);
			self.timer('nav',4000);
	},
	timer: function(element,timeout){
		var self = this;

		setTimeout(function(){ 
			self.content.find(element).css('opacity','1');
		}, timeout);
	}
});