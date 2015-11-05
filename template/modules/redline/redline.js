define({

	renderRedline: function() {

		this.subscribeRedline(this.redlineHtml);
		return this.redlineHtml;
	},

	subscribeRedline: function(self) {

		this.checkProgress();
    	self.on('Test:Passed', function(testId, lastTestId) {
 			this.checkProgress();
    	});
	},

	checkProgress: function(){
		var self = this;
		var counter = localStorage.length - 1;
		var testCounter = 0;
		//Вход в цикл
		for(var i=0; i <= counter; i++){

			if(localStorage.getItem(localStorage.key(i)) != "undefined" && localStorage.getItem(localStorage.key(i)) != "null"){

				var test = JSON.parse(localStorage.getItem(localStorage.key(i)));

				testCounter++

				if(test.statusGeneral){

				 	console.log("Success", i,testCounter,(counter + 1) );
				 	self.animateLine((testCounter * 100)/localStorage.length);
				}else{

					console.log("False");
				}

			}else{

				console.log("Not an object!")
			}
		}
		//Выход из цикла
	},

	animateLine: function(count){
		var line = this.redlineHtml.find('.loaded').css('width',count+'%');
	}
});