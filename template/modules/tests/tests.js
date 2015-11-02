define({

	renderTest: function(testName) {
		this.loadTest(testName);
		return this.testsHtml;
	},

	loadTest: function(testName){
		var self = this;
		var myStorage = localStorage;
		require([
			'text!../../../content/tests/' + testName + '.json'
		], function(json) {

			console.debug('Тест "' + testName + '" загружен');
			self[testName] = JSON.parse(json);

			if(myStorage.getItem(testName)){

				self[testName] = JSON.parse(myStorage.getItem(testName));
			}

			self.printTestPages(self,testName);
		});
	},

	printTestPages: function(self,testName){
		var myStorage = localStorage;
		var test = self[testName];
		var page = self.renderHandlebarsTemplate("#testTemplate",test);

		if(!myStorage.getItem(testName)){

			myStorage.setItem(testName,JSON.stringify(self[testName]));
		}

		self.testsHtml.html(page);
		self.subscribeTest(testName);
		console.debug('Страница добавлена');
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

		$('body').find('#reloadButton').on('click', function(e) {
			console.debug('Тесты сброшены');

			myStorage.clear();

			self.testsHtml.find('.active').toggleClass('active');
			self.testsHtml.find('.answers').toggleClass('active');
		});

		self.on('Quest:Passed', function(testId, testName) {
			var testData = JSON.parse(myStorage.getItem(testName));
			var domTestId = testData.questions[testId].id;

			console.debug('Квест "' + (testId + 1) + " из " + testName + '" завершен');
			testData.questions[testId].status = true;
			myStorage.setItem(testName,JSON.stringify(testData));
			
			self.testsHtml.find('#'+domTestId+' .answers').toggleClass('active');
			self.testsHtml.find('#'+domTestId+' .reward').toggleClass('active');

			self.checkTestComplite(testData,domTestId);

		});

		self.on('Test:Passed', function(testId, lastTestId) {
			// Записываем данные о прохождении всех вопросов в LS
			var testData = JSON.parse(myStorage.getItem(testName));
			testData.statusGeneral = true;
			myStorage.setItem(testName,JSON.stringify(testData));

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

				console.debug("Вопрос " + quest.name + " пройден");
				compleatedQuest++
			}else{

				console.debug("Вопрос " + quest.name + " не пройден")
			}
		});
		if(compleatedQuest === (testData.questions.length - 1)){
			self.trigger('Test:Passed', testData, lastTestId);
			console.debug("Все вопросы пройдены");
		}

	}

})