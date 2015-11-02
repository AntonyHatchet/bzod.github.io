require.config({
	baseUrl: 'vendor',
	paths: {
		'jquery': 'jquery/dist/jquery',
		'backbone': 'backbone/backbone',
		'text': 'text/text',
		'underscore': 'underscore/underscore',
		'handlebars': 'handlebars/handlebars'
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
	'underscore'
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
		initialize: function() {
			var self = this;
			this.loadedModules = [];
	
			/*Таким образом динамически загружается контент и модули. Здесь размещено для инициализации приложения*/
			//this.route('mainScreen', ['preloader']);
			//this.route('gallery', ['mainmenu','reader']);
			//this.route('gallery', ['preloader','accordion', 'redline', 'mainmenu','reader', 'transformer3D', 'tests']);
	
			this.on('Display:Load', function(displayName) {
				self.render();
				console.debug('Рендер экрана "' + displayName + '" завершен');
			});
			console.debug('Инициализация приложения завершена');
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
					console.debug('Загрузка модуля(ей)"' + modules + '" завершена');
					console.debug('Загрузка Экрана"' + this.link + '" началась');
				});
			}
		},
	
		loadTemplate: function(displayName) {
			var self = this;
			require([
				'../../template/displays/' + displayName + '/' + displayName,
				'text!../../template/displays/' + displayName + '/' + displayName + '.html',
			], function(js, html) {
				console.debug('Экран "' + displayName + '" загружен');
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
				if (!_.include(self.loadedModules, module)) {
					require([
						'../../template/modules/' + module + '/' + module ,
						'text!../../template/modules/' + module + '/' + module + '.html'
					], function(js, html) {
						console.debug('Модуль "' + module + '" загружен');
						self[module + 'Html'] = $(html);
						_.extend(self, js);
						self.loadCss(module, 'module');
						self.loadedModules.push(module);
						if((modulesList.length - 1) === i){
							self.trigger('Module:Load', modulesList);
						}
					});
				}else if (modulesList.length - 1 == i){
					console.log('modulesList.length', modulesList.length)
					self.trigger('Module:Load', modulesList);
				}
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
	        "gallery":"gallery",
	        "quest/:name":"activateQuestion",
	        "antiquityInspirationMap" : "antiquityInspirationMap"
	        // matches http://example.com/#anything-here
	    }
	});
	// Initiate the router
	var router = new AppRouter;
	
	router.on('route:defaultRoute', function(actions) {
		console.debug('Переход к mainScreen');
	    app.route('mainScreen', ['preloader']);
	})
	
	router.on('route:gallery', function(actions) {
		console.debug('Переход к gallery');
	    app.route('gallery', ['accordion', 'redline', 'mainmenu','reader', 'transformer3D','video']);
	})
	
	router.on('route:activateQuestion', function(quest) {
		console.debug('Переход к тесту',quest);
	    app.activateQuestion(quest);
	})
	
	router.on('route:antiquityInspirationMap', function(actions) {
		console.debug('Переход к antiquityInspirationMap');
	    app.route('antiquityInspirationMap', ['redline', 'mainmenu','reader', 'transformer3D', 'tests']);
	})
	
	// Start Backbone history a necessary step for bookmarkable URL's
	Backbone.history.start();

});