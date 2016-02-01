define({

	renderTest: function(testName) {
		this.loadTest(testName);
		return this.testsHtml;
	},

	loadTest: function(tests){
		var self = this;
		var myStorage = localStorage;
		var gameProgress = {
			progress:0,
			score:0,
			status:"НОВИЧОК",
			comment:"У вас все еще впереди!",
			img:"img/controll/progress/small/beginer.jpg",
			imgMeta:"img/controll/progress/med/beginer.jpg"
		};
		self.tests = {};
		if(myStorage.getItem("tests")){
			self.tests = JSON.parse(myStorage.getItem('tests'));
		}else{

			tests.forEach(function(testName,i){
				require([
					'text!../../../content/tests/' + testName + '.json'
				], function(json) {
					var test = JSON.parse(json);
					self.tests[testName]={};
					self.tests[testName]=test;
					self.tests[testName].template = self.renderHandlebarsTemplate("#testTemplate", test);
					if (i === (tests.length - 1)){
						localStorage.setItem("tests",JSON.stringify(self.tests));
						localStorage.setItem("progress",JSON.stringify(gameProgress));
					}
				});
			});
		}
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
		var scores = 0;

		//Проверка прохождения теста
		self.testsHtml.find('.imgContainer .img').on('click', function(e) {
			var selector = e.target.getAttribute('data-toogle');
			var testId = $(e.target).closest('section').parent().data('id');
			console.log("click");
			if (selector === 'rightHover') {
				self.testsHtml.find(e.target.parentNode.parentNode.querySelector('.'+selector)).addClass('active');
				self.testsHtml.find(e.target.parentNode.parentNode.parentNode).addClass('complete');
				self.testsHtml.find(e.target.parentNode).addClass('active');
				scores += 3;
				console.log("scores + 3",scores);
				self.trigger('Quest:Passed', testId, testName, scores);
				scores = 0;
			}else{
				self.testsHtml.find(e.target.parentNode.parentNode.querySelector('.'+selector)).addClass('active');
				self.testsHtml.find(e.target.parentNode).addClass('active');
				scores -= 1;
				console.log("scores - 1",scores);
			};
		}).on("dblclick", function(e){
	        e.preventDefault();  //cancel system double-click event
	        console.log("dblclick");
	    });

		// Закрытие теста
		self.testsHtml.find('.goBackButton').on('click', function(e) {
			self.deactivateQuestion(self);
		});

		// Изменение состояния звука в тесте
		// self.testsHtml.find('.soundTestButton').on('click', function(e) {
		// 	self.audioTestControll();
		// });

		// Сброс прохождения тестов
		self.on('Tests:Cleared',function(testId, testName) {
			myStorage.removeItem('tests');
			myStorage.removeItem('maps');
			myStorage.removeItem('progress');

			$('.breadcrumbs>span.white').removeClass('white');
			self.testsHtml.find('.reward').removeClass('active');
			self.testsHtml.find('.imgContainer div').removeClass('active');
			self.testsHtml.find('.answers').addClass('active');
		});

		// Тест пройден, проверяем состояния и окрашиваем поинты и хлебные крошки.
		self.on('Quest:Passed', function(testId, testName, scores) {

			var testData = JSON.parse(myStorage.getItem('tests'));
			var domTestId = testData[testName].questions[(testId - 1)].id;

			testData[testName].questions[(testId - 1)].status = true;

			myStorage.setItem("tests",JSON.stringify(testData));

			self.testsHtml.find('#'+domTestId+' .answers').removeClass('active');
			self.testsHtml.find('#'+domTestId+' .reward').addClass('active');
			self.checkTestComplite(testData[testName],domTestId);
			self.setProggress(scores);
			self.buildDonePoints(testName);
			self.testBreadcrumbsRender("Игра",testData[testName].testName,testName);

		});

		self.on('Test:Passed', function(lastTestId) {
			// Записываем данные о прохождении всех вопросов в LS
			var testData = JSON.parse(myStorage.getItem('tests'));
			var pageHeight = self.testsHtml.find("#"+lastTestId).height();

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
		// Выставляем иконку звука в тест в зависимости от состояния.
		// var soundImgTest = document.getElementById('soundTestButton');
		// console.log("Запуск теста",questionName);
		// if(self.audioState == 0){
		// 	$(soundImgTest).css('background-image','url(img/controll/volume-test-x.png)');
		// }else {
		// 	$(soundImgTest).css('background-image','url(img/controll/volume-test.png)');
		// }

		self.testsHtml.find('#'+questionName).addClass('active');

		$('#tests').addClass('active').animate({ "left": "0" }, 1200 );
		setTimeout(function(){
        	$("html,body").css("overflow-y","scroll");
        	$(self.testsHtml.find('.goBackButton')).css('display','block');
        	$(self.testsHtml.find('.goNext')).css('display','block');
        },1200);

		self.showNextBlock(questionName);
	},
	deactivateQuestion: function(self){
		var tests = document.getElementById('tests');

		$('html,body').animate({
          scrollTop: 0
        }, 1000);
		$("html,body").css("overflow-y","hidden");
		$(tests).delay(1000).animate({ "left": "100vw" }, 1000 );
    	$(self.testsHtml.find('.goBackButton')).css('display','');
    	$(self.testsHtml.find('.goNext')).css('display','');

		setTimeout(function(){
			$(tests).removeClass('active');
			$('#tests>div').removeClass('active');
		},2000);
	},
	showNextBlock: function(questionName){
		var self = this;
		var currentHeight = document.querySelector('#'+questionName+' section').clientHeight;
		var maxHeight = document.getElementById(questionName).clientHeight;
		
		this.testsHtml.find('.goNext').on('click',Animate);

		function Animate(){

			$("html,body").stop().animate({
	          scrollTop: currentHeight + window.pageYOffset
	        }, 500);

	        setTimeout(function(){
	        	if((maxHeight - window.pageYOffset) < (currentHeight + 150)){
		    		self.testsHtml.find('.goNext').off( "click", Animate ).css('display','none');
	        	}
	        },500);
		}
	},
	checkTestComplite: function(testData, lastTestId){
		var self = this;
		var compleatedQuest = 0;

		testData.questions.forEach(function(quest,i,arr){

			if(quest.status){
				compleatedQuest++
			}else{

			}
		});

		if(compleatedQuest === (testData.questions.length)){
			self.trigger('Test:Passed', lastTestId);

		}

	},
	setProggress: function(score){
		var tests = JSON.parse(localStorage.getItem('tests'));
		var progressData = JSON.parse(localStorage.getItem('progress'));
		var allQuestions =  _.flatten(_.map(tests, function(test){ 
			return test.questions
		}));
		var allQuestionsLength = allQuestions.length;
		allQuestions = _.compact(_.map(allQuestions, function(num){ 
			return num.status 
		}));
		var completedQuestionsLength = allQuestions.length;
		console.log("proggressCatcher",progressData.score, "score",score, "progress",(completedQuestionsLength*100)/allQuestionsLength);
		progressData.progress = Math.round((completedQuestionsLength*100)/allQuestionsLength);
		switch(true){
			case progressData.progress <= 12:
				progressData.status = "Новичок";
				progressData.comment = "У вас все еще впереди!";
				progressData.img = "img/controll/progress/small/beginer.jpg";
				progressData.imgMeta = "img/controll/progress/med/beginer.jpg";
				progressData.score += score;
				break;
			case progressData.progress > 12 && progressData.progress <= 18:
				progressData.status = "Ученик";
				progressData.comment = "Неплохо, возможно, вас могли бы взять в ученики.";
				progressData.img = "img/controll/progress/small/scholar.jpg";
				progressData.imgMeta = "img/controll/progress/med/scholar.jpg";
				progressData.score += score;
				break;
			case progressData.progress > 18 && progressData.progress <= 24:
				progressData.status = "Подмастерье";
				progressData.comment = "Вы здорово поработали, продолжайте в том же духе.";
				progressData.img = "img/controll/progress/small/prentice.jpg";
				progressData.imgMeta = "img/controll/progress/med/prentice.jpg";
				progressData.score += score;
				break;
			case progressData.progress > 24 && progressData.progress <= 30:
				progressData.status = "Мастер";
				progressData.comment = "Вы хорошо понимаете особенности мастерства Серова.";
				progressData.img = "img/controll/progress/small/teacher.jpg";
				progressData.imgMeta = "img/controll/progress/med/teacher.jpg";
				progressData.score += score;
				break;
			case progressData.progress > 30:
				progressData.status = "Учитель";
				progressData.comment = "Вы отлично разбираетесь в особенностях творчества Серова!";
				progressData.img = "img/controll/progress/small/master.jpg";
				progressData.imgMeta = "img/controll/progress/med/master.jpg";
				progressData.score += score;
				break;
		}
		console.log("proggressCatcher",progressData);
		localStorage.setItem("progress",JSON.stringify(progressData));
	}
	// Управление звуком
	// audioTestControll: function(){
	// 	var audio = document.getElementById('audio');
	// 	var img = document.getElementById('soundImage');
	// 	var imgTest = document.getElementById('soundTestButton');
	//
	// 	if(this.audioState == 0){
	// 		$(img).attr('src','img/controll/volume.png');
	// 		$(imgTest).css('background-image','url(img/controll/volume-test.png)');
	//
	// 	    audio.play();
	// 		this.audioState = 1;
	// 	}else {
	// 		$(img).attr('src','img/controll/volume-x.png');
	// 		$(imgTest).css('background-image','url(img/controll/volume-test-x.png)');
	//
	// 	    audio.pause();
	// 		this.audioState = 0;
	// 	}
	// }

})
