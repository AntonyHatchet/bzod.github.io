define({

	renderRedline: function() {

		this.subscribeRedline(this.redlineHtml);
		return this.redlineHtml;
	},

	subscribeRedline: function(self) {
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
	}
});
