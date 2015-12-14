define({
	renderMenu: function() {

		this.subscribeMenu(this.mainmenuHtml);
		return this.mainmenuHtml;
	},
	subscribeMenu: function(self) {
		var that = this;
		self.find('.leftSide .icon').on('click', function() {

			self.find('.leftSide .leftMenu').toggleClass('hide');
		});

		self.find('.rightSide *').on('click', function(element) {
			that.controllButtons(self,element);
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

		self.mainmenuHtml.find('.breadcrumbs').html('').append(currentDir,angleRight,currentWays);
	},
	testBreadcrumbsRender: function(testName){
		var self = this;
		var tests;

		if(localStorage.tests){
			tests = JSON.parse(localStorage.tests)[testName];
		}else{
			tests = self.tests[testName];
		}

		var links = [];
		var Span = function(content){

			this.span = document.createElement('span');
			this.span.textContent = content

			return this.span
		}
		var currentDir = splitLink(getCurrentDir())//new Span(getCurrentDir());
		var angleRight = new Span("");
		var verticalBar = new Span(" | ");

		function getCurrentDir(){
			var dir = decodeURI(Backbone.history.getFragment());
					dir = dir.substring(dir.indexOf("/")+1);
					return dir;
		};

		function splitLink(link){
			var firstName = new Span(link.substring(0,link.indexOf("/")));
			var secondName = new Span(link.substring(link.indexOf("/") + 1));

			return [firstName,secondName]
		}

		$(angleRight).addClass('divider fa fa-angle-right');
		$(verticalBar).addClass('verticalBar');

		tests.questions.forEach(function(element){
			 

//console.log(element);
				var test = new Span(element.name);
				if(element.status){
					

//console.log("links true",element);
					$(test).addClass('white');
					links.push(test);
				}else {

					

//console.log("links false",test);
					links.push(test);
				}
		});

		self.mainmenuHtml.find('.breadcrumbs').html('').append(currentDir[0],angleRight,currentDir[1],verticalBar,links);
	},
	controllButtons: function(self,element) {
		if($(element.target).data('id')){

			switch ($(element.target).data('id')) {
				case "reloadButton":
					self.find(".selectSection p").html('Обнулить результат?');
					self.find("#succesMenuButton").attr('href','#reset');
					break;
				case "turnOfSound":
					self.find(".selectSection p").html('Изменить настройки звука?');
					self.find("#succesMenuButton").removeAttr('href');
					break;
				case "goMenu":
					self.find(".selectSection p").html('Вернуться на портал?');
					self.find("#succesMenuButton").attr('href','');
					break;
				case "aboutButton":
					this.trigger('Get:About');
					break;
				default:

			}
			self.find(".pushed").toggleClass('pushed');
			self.find(".selectSection").removeClass().addClass($(element.target).data('id') + " selectSection");
			$(element.target).toggleClass('pushed');
		}
		

//console.log($(element.target).attr('id'))
	}
});
