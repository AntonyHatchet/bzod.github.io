define({
	renderAccordion: function() {
		this.subscribeAccordion(this.accordionHtml);
		return this.accordionHtml;
	},
	subscribeAccordion: function(self) {
		self.find('li').on('click', function(e) {
			self.find('li.active').toggleClass('active');
			self.find(e.target.closest('li')).toggleClass('active');
		});
	},
});