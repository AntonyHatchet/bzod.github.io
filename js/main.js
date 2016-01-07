require.config({
	baseUrl: 'vendor',
	paths: {
		'jquery': 'jquery/dist/jquery',
		'backbone': 'backbone/backbone',
		'text': 'text/text',
		'underscore': 'underscore/underscore',
		'handlebars': 'handlebars/handlebars',
		'parallax': 'parallax/deploy/parallax.min'
	},
	shim: {
		'backbone': {
			deps: ['underscore', 'jquery']
		}
	},
	waitSeconds: 25
});

var app,
	Handlebars;
require([
	'handlebars',
	'jquery',
	'text',
	'backbone',
	'underscore',
	"parallax"
], function(handlebars) {
	Handlebars = handlebars;
	/*------------------ Handlebars Helpers------------------*/
	Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
	    lvalue = parseFloat(lvalue);
	    rvalue = parseFloat(rvalue);
	        
	    return {
	        "+": lvalue + rvalue,
	        "-": lvalue - rvalue,
	        "*": lvalue * rvalue,
	        "/": lvalue / rvalue,
	        "%": lvalue % rvalue,
	        "==": lvalue == rvalue
	    }[operator];
	});
	Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
	
	    switch (operator) {
	        case '==':
	            return (v1 == v2) ? options.fn(this) : options.inverse(this);
	        case '===':
	            return (v1 === v2) ? options.fn(this) : options.inverse(this);
	        case '<':
	            return (v1 < v2) ? options.fn(this) : options.inverse(this);
	        case '<=':
	            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
	        case '>':
	            return (v1 > v2) ? options.fn(this) : options.inverse(this);
	        case '>=':
	            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
	        case '&&':
	            return (v1 && v2) ? options.fn(this) : options.inverse(this);
	        case '||':
	            return (v1 || v2) ? options.fn(this) : options.inverse(this);
	        default:
	            return options.inverse(this);
	    }
	});
	/*------------------ App ------------------*/
	App = Backbone.View.extend({
		el: $('#app'),
		events: {
	    "click a":"open"
	  },
	  open: function(e){
	    e.preventDefault();
	
			var url = $(e.target).closest("a").attr("href");
	
			switch (url){
				case "#lessons":
					$("html,body").css("overflow-y","hidden");
					Backbone.history.navigate("#lessons", {trigger:true});
					break;
				case "#book/history":
	
					app.stopLine();
					app.printBookPages("history");
					app.breadcrumbsRender("Уроки Валентина Серова","Картины по Русской истории");
					app.goTop();
					Backbone.history.navigate(url, {trigger:false,replace:true});
					break;
				case "#book/story":
	
					app.stopLine();
					app.printBookPages("story");
					app.breadcrumbsRender("Уроки Валентина Серова","Иллюстрации басен Крылова");
					app.goTop();
					Backbone.history.navigate(url, {trigger:false,replace:true});
					break;
				case "#book/antiq":
	
					app.stopLine();
					app.printBookPages("antiq");
					app.breadcrumbsRender("Уроки Валентина Серова","Вдохновение античностью");
					app.goTop();
					Backbone.history.navigate(url, {trigger:false,replace:true});
					break;
				case "#video/antiq":
	
				    app.stopLine();
				    app.printVideo("antiq");
				    app.goBottom();
				    app.breadcrumbsRender("Уроки Валентина Серова","Вдохновение античностью");
					Backbone.history.navigate(url, {trigger:false,replace:true});
					break;
				case "#video/story":
	
					app.stopLine();
					app.printVideo("story");
					app.goBottom();
					app.breadcrumbsRender("Уроки Валентина Серова","Иллюстрации басен Крылова");
					break;
				case "#video/history":
	
					app.stopLine();
					app.printVideo("history");
					app.goBottom();
					app.breadcrumbsRender("Уроки Валентина Серова","Картины по Русской истории");
					break;
				case "#games/antiq":
					app.printMap("antiq");
					app.printTestPages("antiq");
				 	app.goBack();
		     		app.testBreadcrumbsRender("Игра","Вдохновение античностью","antiq");
					Backbone.history.navigate(url, {trigger:false,replace:true});
					break;
				case "#games/story":
					app.printMap("story");
					app.printTestPages("story");
				    app.goBack();
		      		app.testBreadcrumbsRender("Игра","Басни Крылова","story");
					Backbone.history.navigate(url, {trigger:false,replace:true});
					break;
				case "#games/history":
					app.printMap("history");
					app.printTestPages("history");
				    app.goBack();
		      		app.testBreadcrumbsRender("Игра","Картины по Русской истории","history");
					Backbone.history.navigate(url, {trigger:false,replace:true});
					break;
				case "#goFront":
	
					app.goFront();
					app.breadcrumbsRender(app.getActiveTab());
					app.breadcrumbsRender("Уроки Валентина Серова");
					Backbone.history.navigate("#lessons", {trigger:false,replace:true});
					break;
				case "#reset":
	
					app.trigger('Tests:Cleared');
			    	localStorage.clear();
					Backbone.history.navigate("#lessons", {trigger:true});
					break;
				case "#sound":
					app.audioControll();
					break;
				case "#fromTestToVideo":
					app.goBottom();
					break;
			}
	  },
		initialize: function() {
			var self = this;
			this.loadedModules = [];
	
			this.on('Display:Load', function(displayName) {
				self.render();
				console.log('Рендер экрана "' + displayName + '" завершен');
			});
			console.log('Инициализация приложения завершена');
		},
	
		route: function(link, modulesList){
			console.log("Запускаем Route к ", link, " c модулями ",modulesList)
			this.link = link;
	
			// Проверяем наличие подключаемых модулей, если их нет загружаем только шаблон
			if (!modulesList){
				this.loadTemplate(link);
			} else {
				// Нашли модуль, или модули. Запускаем их загрузку в контекст приложения.
				this.loadModules(modulesList);
				// Модуль или модули загружены. Начинаем загрузку шаблона.
				this.off('Module:Load').on('Module:Load', function(modules) {
					this.loadTemplate(this.link);
					console.log('Загрузка модуля(ей)"' + modules + '" завершена');
					console.log('Загрузка Экрана"' + this.link + '" началась');
				});
			}
		},
	
		loadTemplate: function(displayName) {
			var self = this;
			require([
				'../../template/displays/' + displayName + '/' + displayName,
				'text!../../template/displays/' + displayName + '/' + displayName + '.html',
			], function(js, html) {
				console.log('Экран "' + displayName + '" загружен');
				_.extend(self, js);
				self.html = $(html);
				self.loadCss(displayName, 'display');
				self.trigger('Display:Load', displayName);
			});
		},
	
		loadModules: function(modulesList) {
			var self = this;
			//Загружаем модули.
			modulesList.forEach(function(module, i){
				// if (!_.include(self.loadedModules, module)) {
					require([
						'../../template/modules/' + module + '/' + module ,
						'text!../../template/modules/' + module + '/' + module + '.html'
					], function(js, html) {
						console.log('Модуль "' + module + '" загружен');
						self[module + 'Html'] = $(html);
						_.extend(self, js);
						self.loadCss(module, 'module');
						self.loadedModules.push(module);
						if((modulesList.length - 1) === i){
							self.trigger('Module:Load', modulesList);
						}
					});
				// }else if (modulesList.length - 1 == i){
				// 	console.log('modulesList.length', modulesList.length)
				// 	self.trigger('Module:Load', modulesList);
				// }
			});
		},
	
		loadCss: function(module, md) {
			var partUpl = md === 'display' ? 'displays' : 'modules';
			var link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = '../../template/' + partUpl + '/' + module + '/' + module + '.css';
			document.getElementsByTagName("head")[0].appendChild(link);
		},
	
		renderHandlebarsTemplate: function(selector,data) {
			console.log('Создаем шаблон Handlebars', selector, data);
	
			var template = Handlebars.compile($(selector).html());
			return template(data);
		}
	});
	app = new App();
	/*------------------ Router ------------------*/
	var AppRouter = Backbone.Router.extend({
	    routes: {
	        "": "defaultRoute",
	        "lessons":"gallery",
	        "games/:test":"games",
	        "book/:name":"reader",
	        "video/:name":"video"
	        // matches http://example.com/#anything-here
	    }
	});
	// Initiate the router
	var router = new AppRouter;
	
	router.on('route:defaultRoute', function() {
	    app.route('mainScreen', ['preloader']);
	})
	
	router.on('route:gallery', function() {
	    app.route('gallery', ['preloader','accordion', 'redline', 'mainmenu','reader', 'transformer3D','maps','video','about','tests']);
	
	    setTimeout(function(){
	      app.breadcrumbsRender("Уроки Валентина Серова",app.getActiveTab());
	    },200);
	})
	
	router.on('route:games', function() {
	    app.route('gallery', ['preloader','accordion', 'redline', 'mainmenu','reader', 'transformer3D','maps','video','about','tests']);
	
	    setTimeout(function(){
	      app.breadcrumbsRender("Уроки Валентина Серова",app.getActiveTab());
	    },200);
	})
	
	router.on('route:reader', function() {
	    app.route('gallery', ['preloader','accordion', 'redline', 'mainmenu','reader', 'transformer3D','maps','video','about','tests']);
	
	    setTimeout(function(){
	      app.breadcrumbsRender("Уроки Валентина Серова",app.getActiveTab());
	    },200);
	})
	
	router.on('route:video', function() {
	    app.route('gallery', ['preloader','accordion', 'redline', 'mainmenu','reader', 'transformer3D','maps','video','about','tests']);
	
	    setTimeout(function(){
	      app.breadcrumbsRender("Уроки Валентина Серова",app.getActiveTab());
	    },200);
	})
	
	router.on('route:reset', function() {
	    app.route('gallery', ['preloader','accordion', 'redline', 'mainmenu','reader', 'transformer3D','maps','video','about','tests']);
	
	    setTimeout(function(){
	      app.breadcrumbsRender("Уроки Валентина Серова",app.getActiveTab());
	    },200);
	})
	
	// Start Backbone history a necessary step for bookmarkable URL's
	Backbone.history.start();

});