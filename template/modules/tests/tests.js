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

			console.log('Тест "' + testName + '" загружен');
			self.tests[testName] = JSON.parse(json);

			if(myStorage.getItem("tests")){

				self.tests = JSON.parse(myStorage.getItem('tests'));
			}

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
		console.log('Страница добавлена');
	},

	subscribeTest: function(testName){
		var self = this;
		var myStorage = localStorage;

		self.testsHtml.find('.imgContainer').on('click', function(e) {
			var selector = e.target.getAttribute('data-toogle');
			var testId = e.target.closest('section').parentNode.getAttribute('data-id');

			self.testsHtml.find(e.target.parentNode.querySelector('.'+selector)).toggleClass('active');

			if (selector === 'rightHover') {

				self.trigger('Quest:Passed', testId, testName);
			};
		});

		self.testsHtml.find('.goBackButton').on('click', function(e) {
			var nodes = e.target.parentNode.childNodes;

			[].forEach.call(nodes,function(element){

				if($(element).hasClass('active')){
					
					$(element).toggleClass('active');
				}
			});

			self.content.find('#tests').toggleClass('active');
		});

		self.on('Tests:Cleared',function(testId, testName) {
			myStorage.clear();

			self.testsHtml.find('.active').toggleClass('active');
			self.testsHtml.find('.answers').toggleClass('active');
			
			console.log('Тесты сброшены');
		});

		self.on('Quest:Passed', function(testId, testName) {
			var testData = JSON.parse(myStorage.getItem('tests'));
			var domTestId = testData[testName].questions[testId].id;

			console.log('Квест "' + (testId + 1) + " из " + testName + '" завершен');
			testData[testName].questions[testId].status = true;
			myStorage.setItem("tests",JSON.stringify(testData));
			
			self.testsHtml.find('#'+domTestId+' .answers').toggleClass('active');
			self.testsHtml.find('#'+domTestId+' .reward').toggleClass('active');

			self.checkTestComplite(testData[testName],domTestId);

		});

		self.on('Test:Passed', function(testId, lastTestId) {
			// Записываем данные о прохождении всех вопросов в LS
			var testData = JSON.parse(myStorage.getItem('tests'));
			testData[testName].statusGeneral = true;
			myStorage.setItem('tests',JSON.stringify(testData));

			self.testsHtml.find('#finishTest').toggleClass('active');
			self.testsHtml.find('#'+lastTestId).toggleClass('unActive');
		});
	},

	activateQuestion: function(questionName){
		var self = this;
		console.log(self)
		self.testsHtml.find('#'+questionName).toggleClass('active');
		self.content.find('#tests').toggleClass('active');
	},

	checkTestComplite: function(testData, lastTestId){
		var self = this;
		var compleatedQuest = 0;
		testData.questions.forEach(function(quest,i,arr){

			if(quest.status){

				console.log("Вопрос " + quest.name + " пройден");
				compleatedQuest++
			}else{

				console.log("Вопрос " + quest.name + " не пройден")
			}
		});
		if(compleatedQuest === (testData.questions.length - 1)){
			self.trigger('Test:Passed', testData, lastTestId);
			console.log("Все вопросы пройдены");
		}

	}

})