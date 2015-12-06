define({
	renderAccordion: function() {
		this.subscribeAccordion(this.accordionHtml);
		return this.accordionHtml;
	},
	subscribeAccordion: function(self) {
		var that = this;

		self.find('li').on('click', function(e) {
			var link = $(e.target).closest('li').attr('data-href');

			self.find('li.active').toggleClass('active');
			self.find($(e.target).closest('li')).toggleClass('active');
			that.trigger('Accordeon:Listed');
			that.breadcrumbsRender(link);
		});

		self.find('a').hover(function(e){
			$(e.target).closest(".circle").toggleClass('hover');
		});

		this.on('RedLine:Passed',function(){
			var elements = self.find('li');
			var currentActive;

			[].forEach.call(elements,function(li){

				if(li.matches('.active')){

					if((_.indexOf(elements, li) +1 ) == elements.length){

						currentActive = 0;
					}else{

						currentActive = (_.indexOf(elements, li) + 1);
					}
				}
			});

			that.changeActiveBlock(elements,elements[(currentActive)]);
		});

		this.checkImageProgress();
		this.animateButtons();
	},
	changeActiveBlock: function(allElement,mustActivateLi){

		$(allElement).removeClass('active');
		$(mustActivateLi).addClass('active');
		this.trigger('Accordeon:Listed');
	},
	checkImageProgress: function(){
		var self = this;
		var test = JSON.parse(localStorage.getItem("tests"));

		//Вход в цикл

		if(test){
			_.keys(test).forEach(function(element){

				if(test[element].statusGeneral){

					self.accordionHtml.find("#"+test[element].name +" img").attr("src",test[element].rewardGeneral);
					self.accordionHtml.find("#"+test[element].name).addClass("opened");
				}else{



//console.log("False");
				}
			});
		}else{



//console.log("Not an object!")
		}
		//Выход из цикла
	},
	getActiveTab: function(){
		var self = this;

		return self.find('li.active').attr('data-href');
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
