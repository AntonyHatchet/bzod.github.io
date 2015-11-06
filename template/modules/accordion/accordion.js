define({
	renderAccordion: function() {
		this.subscribeAccordion(this.accordionHtml);
		return this.accordionHtml;
	},
	subscribeAccordion: function(self) {
		var that = this;

		self.find('li').on('click', function(e) {
			var link = $(e.target).closest('li').attr('data-href')

			self.find('li.active').toggleClass('active');
			self.find($(e.target).closest('li')).toggleClass('active');

			that.breadcrumbsRender(link);
		});

		this.checkImageProgress();
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

					console.log("False");
				}
			});
		}else{

			console.log("Not an object!")
		}
		//Выход из цикла
	},
	getActiveTab: function(){
		var self = this;

		return self.find('li.active').attr('data-href');
	}
});