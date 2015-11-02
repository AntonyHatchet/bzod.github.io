define({
	render: function() {
		this.content = this.html;

		var preloader = this.renderPreloader();

		$('body').html('').append(preloader, this.content);
		this.preloadImage();
		this.subscribe();
	},
	subscribe: function() {
		var self = this;

		this.on('Preload:End', self.animate);

		// this.content.find('#game').on('click', function(e) {
		// 	e.preventDefault();
		// 	self.route('gallery', ['preloader','accordion', 'redline', 'mainmenu','reader', 'transformer3D', 'tests']);
		// });
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
