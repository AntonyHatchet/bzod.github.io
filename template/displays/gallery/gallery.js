define({
	render: function() {

		this.content = this.html;

		var menu = this.renderMenu();
		var accordion = this.renderAccordion();
		var video = this.renderVideo('video');
		var reader = this.renderReader('book');

		var transformer3D = this.renderTransformer3D([accordion,reader,video]);

		this.content.append(transformer3D); 

		$('body').html('').append(this.content, menu);

		this.subscribe();
	},
	subscribe: function() {
		var self = this;
	}
});