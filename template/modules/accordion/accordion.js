define({
	renderAccordion: function() {
		this.subscribeAccordion(this.accordionHtml);
		return this.accordionHtml;
	},
	subscribeAccordion: function(self) {
		console.log(this, self, "subscribeAccordion");
		self.find('li').on('click', function(e) {
			self.find('li.active').toggleClass('active');
			self.find(e.target.closest('li')).toggleClass('active');
		});
		this.checkImageProgress();
	},
	checkImageProgress: function(){
		var self = this;
		var counter = localStorage.length - 1;

		//Вход в цикл
		for(var i=0; i <= counter; i++){

			if(localStorage.getItem(localStorage.key(i)) != "undefined" && localStorage.getItem(localStorage.key(i)) != "null"){

				var test = JSON.parse(localStorage.getItem(localStorage.key(i)));

				if(test.statusGeneral){

					console.log("UPPPPP");
					self.accordionHtml.find("#"+test.name +" img").attr("src",test.rewardGeneral);
					self.accordionHtml.find("#"+test.name).addClass("opened");
				}else{

					console.log("False");
				}

			}else{

				console.log("Not an object!")
			}
		}
		//Выход из цикла
	},
});