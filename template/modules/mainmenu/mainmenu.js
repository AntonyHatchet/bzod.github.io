define({
	renderMenu: function() {
		this.subscribeMenu();
		return this.mainmenuHtml;
	},
	subscribeMenu: function() {
		var self = this;

		self.mainmenuHtml.find('.leftSide .icon').on('click', function() {
			mainmenuHtml.find('.leftSide .leftMenu').toggleClass('hide');
		});

		self.mainmenuHtml.find('#reloadButton').on('click', function(e) {
			self.trigger('Tests:Cleared');
			localStorage.clear();
		});
	}
});