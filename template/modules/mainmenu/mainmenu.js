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
		var Span = function(content){

			this.span = document.createElement('span');
			this.span.textContent = content

			return this.span
		}

		function getCurrentDir(){
			var dir = decodeURI(Backbone.history.getFragment());
					dir = dir.substring(dir.indexOf("/")+1);
					return dir
		};
		var currentDir = new Span(getCurrentDir());
		var currentWays = new Span(ways);
		var angleRight = new Span("");

		$(angleRight).addClass('divider fa fa-angle-right')
		console.log(currentWays,currentDir);

		self.mainmenuHtml.find('.breadcrumbs').html('').append(currentDir,angleRight,currentWays);
	},
	testBreadcrumbsRender: function(testName){
		var self = this;
		var tests = JSON.parse(localStorage.getItem('tests'));
		var links = [];
		var Span = function(content){

			this.span = document.createElement('span');
			this.span.textContent = content

			return this.span
		}
		var currentDir = new Span(getCurrentDir());
		var angleRight = new Span("");

		function getCurrentDir(){
			var dir = decodeURI(Backbone.history.getFragment());
					dir = dir.substring(dir.indexOf("/")+1);
					return dir
		};

		$(angleRight).addClass('divider fa fa-angle-right')

		tests[testName].questions.forEach(function(element){
			 console.log(element);
				var test = new Span(element.name);
				if(element.status){
					console.log("links true",element);
					$(test).addClass('white');
					links.push(test);
				}else {

					console.log("links false",test);
					links.push(test);
				}
		});
		//
		// function fullLink(currentDir,tests){
		//
		// 	var link = currentDir + currentWays;
		// 	return link
		// }

		self.mainmenuHtml.find('.breadcrumbs').html('').append(currentDir,angleRight,links);
	}
});
