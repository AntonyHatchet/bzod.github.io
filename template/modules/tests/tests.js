define({

	renderTest: function(testName) {
		console.log("Going render test");
		this.loadTest(testName);
		return this.testsHtml;
	},

	loadTest: function(tests){
		var self = this;
		var myStorage = localStorage;

		self.tests = {};

		if(myStorage.getItem("tests")){
			self.tests = JSON.parse(myStorage.getItem('tests'));
		}

		tests.forEach(function(testName,i){
			require([
				'text!../../../content/tests/' + testName + '.json'
			], function(json) {
				var test = JSON.parse(json);
				self.tests[testName]={};
				self.tests[testName]=test;
				self.tests[testName].template = self.renderHandlebarsTemplate("#testTemplate", test);
			});
		})
	},

	printTestPages: function(testName){
		var self = this;

		if(!localStorage.getItem("tests")){
			localStorage.setItem("tests",JSON.stringify(self.tests));
		}

		self.testsHtml.html(self.tests[testName].template);
		self.subscribeTest(testName);
		self.buildDonePoints(testName);
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
				$("html,body").css("overflow-y","hidden");
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

			console.log('testId:',testId,' testName: ', testName, ' testData: ',testData[testName])
			console.log(' testData questions: ',testData[testName].questions)

			var domTestId = testData[testName].questions[(testId - 1)].id;

//console.log('Квест "' + ((testId - 1)) + " из " + testName + '" завершен');
			testData[testName].questions[(testId - 1)].status = true;
			myStorage.setItem("tests",JSON.stringify(testData));


//console.log('Квест ID "' + domTestId );
			self.testsHtml.find('#'+domTestId+' .answers').removeClass('active');
			self.testsHtml.find('#'+domTestId+' .reward').addClass('active');

			self.checkTestComplite(testData[testName],domTestId);

			self.buildDonePoints(testName);
			self.testBreadcrumbsRender("Игра",testData[testName].testName,testName);

		});

		self.on('Test:Passed', function(lastTestId) {
			// Записываем данные о прохождении всех вопросов в LS
			var testData = JSON.parse(myStorage.getItem('tests'));
			var pageHeight = self.testsHtml.find("#"+lastTestId).height();

			console.log("Test passed",lastTestId,"pageHeight",pageHeight);

			testData[testName].statusGeneral = true;

			myStorage.setItem('tests',JSON.stringify(testData));

			self.testsHtml.find('#finishTest').addClass('active').css("top",pageHeight);

			setTimeout(function(){
				$('html,body').animate({
		          scrollTop: window.pageYOffset + document.documentElement.clientHeight
		        }, 1000);
			}, 200);
		});
	},

	activateQuestion: function(questionName){
		var self = this;

		self.testsHtml.find('#'+questionName).addClass('active');
		$('#tests').addClass('active').animate({ "left": "0" }, 1200 );
		setTimeout(function(){
	        	$("html,body").css("overflow-y","scroll");
	        },1200);
		self.showNextBlock(questionName);
	},
	showNextBlock: function(questionName){
		var self = this;

		self.testsHtml.find('.goNext').on('click',function(){
			
			$("html,body").stop();

			var height = document.documentElement.clientHeight + window.pageYOffset;
			var maxHeight = document.getElementById(questionName).clientHeight;

			$("html,body").animate({
	          scrollTop: height
	        }, 500);

	        setTimeout(function(){
	        	if((maxHeight - window.pageYOffset) === document.documentElement.clientHeight){
	        		$(self.testsHtml.find('.goNext')).css('display','none');
	        	}
	        },500);
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
			self.trigger('Test:Passed', lastTestId);

		}

	}

})
