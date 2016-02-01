define({
	renderAccordion: function() {
		this.subscribeAccordion(this.accordionHtml);
		return this.accordionHtml;
	},
	subscribeAccordion: function(self) {
		var that = this;

		//Переключение колонок
		self.find('li').on('click', function(e) {
			var link = $(e.target).closest('li').attr('data-href');
			self.find('li.active').toggleClass('active');
			self.find($(e.target).closest('li')).toggleClass('active');
			that.trigger('Accordeon:Listed');
			that.breadcrumbsRender("Уроки Валентина Серова",link);
		});

		that.on('Test:Passed', function(){
			console.log('Test:Passed');
			that.checkImageProgress();
		});
		//Кнопки перехода
		self.find('a').hover(function(e){
			$(e.target).closest(".circle").toggleClass('hover');
		});

		this.checkImageProgress();
		this.animateButtons();
	},
	// changeActiveBlock: function(allElement,mustActivateLi){

	// 	$(allElement).removeClass('active');
	// 	$(mustActivateLi).addClass('active');
	// 	this.trigger('Accordeon:Listed');
	// },
	checkImageProgress: function(){
		var self = this;
		var test = JSON.parse(localStorage.getItem("tests"));
		console.log("checkImageProgress");
		//Вход в цикл
		//console.log("ПРоверяем тест на выполнение");
		if(test){
			_.keys(test).forEach(function(element){

				console.log("Проверяем тест "+element+" на выполнение");

				if(test[element].statusGeneral){

					console.log("Проверяем тест "+element+" пройден");
					//console.log("Тест",test[element]);

					$(self.accordionHtml.find("#"+test[element].name +" img")).attr("src",test[element].rewardGeneral);
					$(self.accordionHtml.find("#"+test[element].name)).addClass("opened");
				}else{
					$(self.accordionHtml.find("#"+test[element].name +" img")).attr("src",test[element].baseImage);
				}
			});
		}else{
			//console.log("Not an object!")
		}
		//Выход из цикла
	},
	getActiveTab: function(){
		var self = this;

		return $(self.accordionHtml.find('li.active')).attr('data-href');
	},
	animateButtons: function(){
		var self = this.accordionHtml;

		var firstElement = self.find('.animationPolyOne');
		var secondElement = self.find('.animationPolyTwo');
		var therdElement = self.find('.animationPolyThree');

		function zoomFirst(opacity){
		  	$(firstElement).css('opacity','0.55');
		};
		function zoomSecond(opacity){
			$(secondElement).css('opacity','0.35');
		};
		function zoomTherd(opacity){
			$(therdElement).css('opacity','0.15');
		};

		function zoomOut(){
			$(firstElement).css('opacity','0');
			$(secondElement).css('opacity','0');
			$(therdElement).css('opacity','0');
		};

		var timerPoints = setTimeout(function tick() {
			zoomOut();
			setTimeout(zoomFirst,1000);
			setTimeout(zoomSecond,1150);
			setTimeout(zoomTherd,1300);
			setTimeout(zoomOut, 1800);
		  timerPoints = setTimeout(tick, 10000);
		}, 10000);
	}
});
