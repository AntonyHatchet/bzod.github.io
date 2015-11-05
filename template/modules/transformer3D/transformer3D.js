define({
	renderTransformer3D: function(pages) {
		this.fillTransformer3D(pages);
		return this.transformer3DHtml;
	},
	fillTransformer3D: function(pages) {
		var self = this;
		console.log('Transformer3D', self);

		this.transformer3DHtml.find('.front').html(pages[0]);
		this.transformer3DHtml.find('.top').html(pages[1]);
		this.transformer3DHtml.find('.bottom').html(pages[2]);
	},
	goTop: function(){
		this.transformer3DHtml.find('#cube').removeClass();
		this.transformer3DHtml.find('#cube').toggleClass('show-top');
	},
	goBottom: function(){
		this.transformer3DHtml.find('#cube').removeClass();
		this.transformer3DHtml.find('#cube').toggleClass('show-bottom');
	},
	goFront: function(){
		this.transformer3DHtml.find('#cube').removeClass();
		this.transformer3DHtml.find('#cube').toggleClass('show-front');
	}
});