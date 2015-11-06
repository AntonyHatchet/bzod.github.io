define({
	renderMenu: function() {
		this.subscribeMenu(this.mainmenuHtml);
		return this.mainmenuHtml;
	},
	subscribeMenu: function(self) {

		self.find('.leftSide .icon').on('click', function() {
			self.find('.leftSide .leftMenu').toggleClass('hide');
		});

		self.find('#reloadButton').on('click', function(e) {
			self.trigger('Tests:Cleared');
			localStorage.clear();
		});
	},
	breadcrumbsRender: function(ways){
		var self = this;

		console.log("breadcrumbsbreadcrumbsbreadcrumbsbreadcrumbsbreadcrumbsbreadcrumbsbreadcrumbs", Backbone.history.getFragment() );

		var Span = function(content){
			this.span = document.createElement('span');
			this.span.textContent = content
			return this.span
		}
		var currentDir = new Span(Backbone.history.getFragment());
		var currentWays = new Span(ways);
		var angleRight = new Span("");
		$(angleRight).addClass('divider fa fa-angle-right')
		console.log(currentWays,currentDir);

		function fullLink(currentDir,currentWays){
			console.log(currentWays,currentDir);
			var link = currentDir + currentWays;
			return link
		}

		self.mainmenuHtml.find('.breadcrumbs').html('').append(currentDir,angleRight,currentWays);
	},
	testBreadcrumbsRender: function(){
		//TODO включить отображение пройденных тестов
	}
});