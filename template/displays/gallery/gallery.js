define({
	render: function() {

		this.content = this.html;

		var preloader = this.renderPreloader();
		var menu = this.renderMenu();
		var accordion = this.renderAccordion();
		var video = this.renderVideo('video');
		var reader = this.renderReader(['antiq','history','story']);
		var redline = this.renderRedline();

		var transformer3D = this.renderTransformer3D([accordion,reader,video]);

		this.content.append(transformer3D);
		this.content.find('#accordion li').append(redline); 
		this.content.find('#accordion li.active').append(preloader);

		$('body').html('').append(this.content, menu);

		this.preloadImage(90);
		this.subscribe(redline);
	},
	subscribe: function(redline) {
		var self = this;

		this.on('Accordeon:Listed',function(){
			self.refreshLine(); 
		});
	}
});
