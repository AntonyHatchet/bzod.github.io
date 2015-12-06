define({

	renderRedline: function() {

		this.subscribeRedline(this.redlineHtml);
		return this.redlineHtml;
	},

	subscribeRedline: function(self) {
<<<<<<< HEAD
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
=======
		var self = this;
		var counter = 0;

		self.on('Preload:End', function(){
			setInterval(function () {
					counter++;
					if(counter === 1){
						self.animateLine(counter);
					}else if(counter == 100){
						self.trigger('RedLine:Passed');
						self.clearInterval();
					}
			},400);
		});
	},

	animateLine: function(count){

		var line = $(this.redlineHtml.find('.loaded')).animate({'width':'100%'}, 19000);
>>>>>>> be10bb60a31ce7f9716b37f8657390e69fb47ef6
	}
});
