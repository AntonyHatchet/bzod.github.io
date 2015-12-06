define({

	renderRedline: function() {

		this.subscribeRedline(this.redlineHtml);
		return this.redlineHtml;
	},

	subscribeRedline: function(self) {
		var self = this;

		self.on('Preload:End', function(){
			self.animateLine();
		});

		self.on('Refresh:Line', function(){
			self.animateLine();
		});
	},

	animateLine: function(){
		var self = this;
		var line = $('.loaded');
		line.animate({'width':'100%'}, 19000);

		var counter = 0;

		var interval = setInterval(function () {

				counter++;

				if(counter == 100){
					self.trigger('RedLine:Passed');
					clearInterval(interval);
				}else{
					console.log('counter* = '+ counter);
				}
				self.on('Refresh:Line', function(){
					clearInterval(interval);
				});
		},200);
	},
	refreshLine: function(){
		$('.loaded').stop().css('width', '0');
		this.trigger('Refresh:Line');
	}
});
