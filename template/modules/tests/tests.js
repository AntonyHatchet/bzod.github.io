define({

	renderTest: function(testName) {
		this.loadTest(testName);
		return this.testsHtml;
	},

	loadTest: function(testName){
		var self = this;
		var myStorage = localStorage;
		self.tests = {};
		require([
			'text!../../../content/tests/' + testName + '.json'
		], function(json) {



//console.log('Тест "' + testName + '" загружен');
			self.tests[testName] = JSON.parse(json);

			if(myStorage.getItem("tests")){

				self.tests = JSON.parse(myStorage.getItem('tests'));
			}
			self.trigger('Test:Loaded');
			self.printTestPages(self,testName);
		});
	},

	printTestPages: function(self,testName){
		var myStorage = localStorage;
		var test = self.tests[testName];
		var page = self.renderHandlebarsTemplate("#testTemplate",test);

		if(!myStorage.getItem("tests")){

			myStorage.setItem("tests",JSON.stringify(self.tests));
		}

		self.testsHtml.html(page);
		self.subscribeTest(testName);
	},

	subscribeTest: function(testName){
		var self = this;
		var myStorage = localStorage;
		self.testsHtml.find('.imgContainer .img').on('click', function(e) {
			var selector = e.target.getAttribute('data-toogle');
			var testId = $(e.target).closest('section').parent().data('id');

			self.testsHtml.find(e.target.parentNode.parentNode.querySelector('.'+selector)).addClass('active');
			self.testsHtml.find(e.target.parentNode).addClass('active');
			if (selector === 'rightHover') {

				self.trigger('Quest:Passed', testId, testName);
			};
		});

		self.testsHtml.find('.goBackButton').on('click', function(e) {
			var tests = document.getElementById('tests');

			$('html,body').animate({
	          scrollTop: 0
	        }, 1000);
			$(tests).delay(1000).animate({ "left": "100vw" }, 1000 );
			$(self.testsHtml.find('.goNext')).css('display','block');
			setTimeout(function(){
				$(tests).removeClass('active');
				$('#tests>div').removeClass('active');
			},2000);
		});

		self.on('Tests:Cleared',function(testId, testName) {
			myStorage.clear();

			self.testsHtml.find('.reward').removeClass('active');
			self.testsHtml.find('.answers').addClass('active');



//console.log('Тесты сброшены');
		});

		self.on('Quest:Passed', function(testId, testName) {
			var testData = JSON.parse(myStorage.getItem('tests'));


//console.log('testId:',testId,'testName: ', testName, 'testData: ',testData)
			var domTestId = testData[testName].questions[(testId - 1)].id;



//console.log('Квест "' + ((testId - 1)) + " из " + testName + '" завершен');
			testData[testName].questions[(testId - 1)].status = true;
			myStorage.setItem("tests",JSON.stringify(testData));


//console.log('Квест ID "' + domTestId );
			self.testsHtml.find('#'+domTestId+' .answers').removeClass('active');
			self.testsHtml.find('#'+domTestId+' .reward').addClass('active');

			self.checkTestComplite(testData[testName],domTestId);

			self.buildDonePoints();
			self.testBreadcrumbsRender(testName);

		});

		self.on('Test:Passed', function(testId, lastTestId) {
			// Записываем данные о прохождении всех вопросов в LS
			var testData = JSON.parse(myStorage.getItem('tests'));
			testData[testName].statusGeneral = true;
			myStorage.setItem('tests',JSON.stringify(testData));

			$('html,body').animate({
	          scrollTop: 0
	        }, 1000);
			self.testsHtml.find('#finishTest').toggleClass('active');
			self.testsHtml.find('#'+lastTestId).toggleClass('unActive');
		});
	},

	activateQuestion: function(questionName){
		var self = this;

		self.testsHtml.find('#'+questionName).addClass('active');
		$('#tests').addClass('active').animate({ "left": "0" }, 1200 );
		self.showNextBlock();
	},
	showNextBlock: function(){
		var self = this;

		self.testsHtml.find('.goNext').on('click',function(){
			var height = document.documentElement.clientHeight + window.pageYOffset;
			var maxHeight = document.getElementById('tests').clientHeight;
			
			$("html,body").animate({
	          scrollTop: height
	        }, 1000);

	        setTimeout(function(){
	        	if((maxHeight - window.pageYOffset) === document.documentElement.clientHeight){
	        		$(self.testsHtml.find('.goNext')).css('display','none');
	        	}
	        },1000);
		});
	},
	checkTestComplite: function(testData, lastTestId){
		var self = this;
		var compleatedQuest = 0;
		testData.questions.forEach(function(quest,i,arr){

			if(quest.status){



//console.log("Вопрос " + quest.name + " пройден");
				compleatedQuest++
			}else{



//console.log("Вопрос " + quest.name + " не пройден")
			}
		});
		if(compleatedQuest === (testData.questions.length)){
			self.trigger('Test:Passed', testData, lastTestId);


//console.log("Все вопросы пройдены");
		}

	}

})
