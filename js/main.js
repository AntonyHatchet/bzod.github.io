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
	waitSeconds: 15
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
	/*------------------ App ------------------*/
	App = Backbone.View.extend({
		el: $('#app'),
		initialize: function() {
			var self = this;
	
			/*Таким образом динамически загружается контент и модули. Здесь размещено для инициализации приложения*/
			this.route('mainScreen',['preloader']);
	
			/*Это уже постоянная часть приложения. Т.е. точкой через которую работают загруженые методы, будет метод render() который находится в файле /template/displays/gallery.js*/
			this.on('Display:Load', function(displayName) {
				_.extend(self, self.js);
				self.render();
				console.debug('Рендер экрана "' + displayName + '" завершен');
			});
			console.debug('Инициализация приложения завершена');
		},
		route: function(link,modulesList){
	
			// Проверяем наличие подключаемых модулей, если их нет загружаем только шаблон
			if (!modulesList){
				this.loadTemplate(link);
			}else{
			// Нашли модуль, или модули. Запускаем их загрузку в контекст приложения.
				this.loadModules(modulesList);
			// Модуль или модули загружены. Начинаем загрузку шаблона.
				this.on('Module:Load', function(modules) {
					this.loadTemplate(link);
					console.debug('Загрузка модуля(ей)"' + modules + '" завершена');
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
				self.js = js;
				self.html = $(html);
				self.trigger('Display:Load', displayName);
			});
		},
		loadModules: function(modulesList) {
			var self = this;
			//Загружаем модули. 
			modulesList.forEach(function(modul, i){
				require([
					'../../template/modules/' + modul + '/' + modul ,
					'text!../../template/modules/' + modul + '/' + modul + '.html'
				], function(moduleJs,moduleHtml) {
					console.debug('Модуль "' + modul + '" загружен');
					self[modul] = $(moduleHtml);
					self[modul+"Js"] = moduleJs;
					if((modulesList.length - 1) === i){
						self.trigger('Module:Load', modulesList);
					}
				});
			});
		}
	});
	app = new App();
});