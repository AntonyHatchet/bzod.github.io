define({
	render: function() {
		this.content = this.html;

		var preloader = this.renderPreloader();

		$('body').html('').append(preloader, this.content);
		this.preloadImage(150);
		this.subscribe();
	},
	subscribe: function() {
		var self = this;

		this.on('Preload:End', self.animate);

		var scene = this.content.find('#scene');
		var parallax = new Parallax(scene[0]);

		// this.content.find('#game').on('click', function(e) {
		// 	e.preventDefault();
		// 	self.route('gallery', ['preloader','accordion', 'redline', 'mainmenu','reader', 'transformer3D', 'tests']);
		// });
	},
	animate: function(){
		var self = this;
		self.timer('li:nth-child(8) img',0);
		self.timer('li:nth-child(9) img',1000);
		self.timer('li:nth-child(5) img',1200);
		self.timer('li:nth-child(7) img',1200);
		self.timer('li:nth-child(4) img',2000);
		self.timer('li:nth-child(6) img',2000);
		self.timer('li:nth-child(10) img',2000);
		self.timer('li:nth-child(2) img',2120);
		self.timer('li:nth-child(3) img',3080);
		self.timer('nav',4000);
	},
	timer: function(element,timeout){
		var self = this;

		setTimeout(function(){
			self.content.find(element).css('opacity','1');
		}, timeout);
	}
});
