define({
	renderTransformer3D: function(pages) {
		this.subscribeTransformer3D(pages);
		return this.transformer3DHtml;
	},
	subscribeTransformer3D: function(pages) {
		var self = this;
		console.log('Transformer3D', self);

		this.transformer3DHtml.find('.front').html(pages[0]);
		this.transformer3DHtml.find('.top').html(pages[1]);
		this.transformer3DHtml.find('.bottom').html(pages[2]);
		//this.transformer3DHtml.find('.bottom').html(pages[2]);
		//this.transformer3DHtml.find('.back').append(secondPage);
		this.transformer3DHtml.find('.goTop').on('click', function(e) {
			self.transformer3DHtml.find('#cube').toggleClass('show-top');
		});
		console.log('subscribeTransformer3D');
		// this.transformer3DHtml.find('#goFront').on('click', function(e) {
		// 	alert("Промотает вниз когда там будет контент")
		// 	self.transformer3DHtml.find('#cube').toggleClass('show-top');
		// });
		this.transformer3DHtml.find('.goBottom').on('click', function(e) {
			self.transformer3DHtml.find('#cube').toggleClass('show-bottom');
			//alert("Промотает вниз когда там будет контент")
		});
	},
});