define({
	renderMenu: function() {
		this.subscribeMenu(this.mainmenuHtml);
		return this.mainmenuHtml;
	},
	subscribeMenu: function(self) {
		self.find('.leftSide .icon').on('click', function() {
			self.find('.leftSide .leftMenu').toggleClass('hide');
		});
	}
});