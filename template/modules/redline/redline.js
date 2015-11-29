define({

	renderRedline: function() {

		this.subscribeRedline(this.redlineHtml);
		return this.redlineHtml;
	},

	subscribeRedline: function(self) {

		this.checkProgress();
    	self.on('Test:Passed', function() {
 			this.checkProgress();
    	});
	},

	checkProgress: function(){
		var self = this;
		var tests = localStorage.getItem('tests');
		var tests = JSON.parse(tests);

		

//console.log('checkProgress tests',tests);
		var testCounter = 0;
		//Вход в цикл
		_.keys(tests).forEach(function(test,counter,arr){
			

//console.log("forEach checkProgress",tests[test])
			testCounter++

			if(tests[test].statusGeneral){

			 	

//console.log("Success", counter,testCounter,(counter + 1) );
			 	self.animateLine((testCounter * 100)/arr.length);
			}else{

				

//console.log("False");
			}
		});
		//Выход из цикла
	},

	animateLine: function(count){
		var line = this.redlineHtml.find('.loaded').css('width',count+'%');
	}
});