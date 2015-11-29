define({
	render: function() {
		var self = this;
		this.content = this.html;
		var menu = this.renderMenu();
		var test = this.renderTest('antiquityInspiration');

		this.content.append(test);
		$('body').html('').append(this.content, menu);

		self.on('Test:Loaded', function() {
			this.subscribe();
			this.buildDonePoints();
			this.animatePoints();
			this.animateClouds();
			this.animateShip();
		});
	},

	subscribe: function() {
		var self = this;

		self.content.find(".point").on('click', function(e) {
			var cityName = 	$(this).data("id");
			
			self.activateQuestion(cityName)
			console.log("Click on point! ", cityName);
		});

		setTimeout(function(){
			self.testBreadcrumbsRender('antiquityInspiration');
		},1000)

	},


	buildDonePoints: function(){
		var data;
		if(localStorage.tests){
			data = JSON.parse(localStorage.tests);
		}else{
			data = this.tests;
		}
		data.antiquityInspiration.questions.forEach(function(item, i){
			$("." +item.id + "").attr('data-id', item.id);
			if (item.status){
				$("." +item.id + "").addClass("done");
				$("img." +item.id + "").remove();
				$("<img class=" + item.id + " src="+"/img/antiquityInspirationMap/pointDone.png"+">").appendTo(".done."+item.id+"");
				$("img." +item.id + "").addClass("done");
			}
		});
	},

	animateClouds: function(){
		var self = this;

		var directionArray = ['left', 'right', 'up', 'down'];
		var elementsArray = ['.c1', '.c2', '.c3'];

		function getRandomArrayElement(array){
			var rand = Math.floor(Math.random() * array.length);
			return array[rand];
		}

		function getRandomInteger(min, max) {
    	var rand = min - 0.5 + Math.random() * (max - min + 1)
    	rand = Math.round(rand);
    	return rand;
  	}

		 function moveElementTowards (element, direction){
			switch (direction){
				case 'left':
					self.content.find(element).css("top", getRandomInteger(1, 70) + "%");
					self.content.find(element).css("left", getRandomInteger(100, 140) + "%");
					self.content.find(element).addClass("move-left");
					break;
				case 'right':
					self.content.find(element).css("top", getRandomInteger(1, 70) + "%");
					self.content.find(element).css("left", -getRandomInteger(10, 40) + "%");
					self.content.find(element).addClass("move-right");
					break;
				case 'up':
					self.content.find(element).css("top", getRandomInteger(110, 130) + "%");
					self.content.find(element).css("left", getRandomInteger(1, 80) + "%");
					self.content.find(element).addClass("move-up");
				break;
				case 'down':
					self.content.find(element).css("top", -getRandomInteger(40, 60) + "%");
					self.content.find(element).css("left", getRandomInteger(1, 80) + "%");
					self.content.find(element).addClass("move-down");
				break;
			}
		}

			var timerClouds = setTimeout(function tick() {
						elementsArray.forEach(function(item, i, arr) {
							moveElementTowards(item, getRandomArrayElement(directionArray))
						});
			  timerClouds = setTimeout(tick, 120000);
			}, 1000);

	},

	animatePoints: function(){
		var self = this;
		function zoomIn(){
			self.content.find(".animatePoint").css("transform", "scale(1)");
		};

		function zoomOut(){
			  self.content.find(".animatePoint").css("transform", "scale(0.5)");
		};

		var timerPoints = setTimeout(function tick() {
			zoomOut();
			setTimeout(zoomIn,1000);
			setTimeout(zoomOut, 2000);
		  timerPoints = setTimeout(tick, 15000);
		}, 15000);

	},

	animateShip: function (){
	var self = this;
		function moveRight(){
				self.content.find("img.ship").remove();
				$(new Image()).attr('src', '' + "/img/antiquityInspirationMap/shipRight.png").addClass('ship').appendTo($('.shipContainer'));
				self.content.find('.shipContainer').removeClass("ship-move-left");
			  self.content.find('.shipContainer').addClass("ship-move-right");
		};
		function moveLeft(){
				self.content.find("img.ship").remove();
				$(new Image()).attr('src', '' + "/img/antiquityInspirationMap/shipLeft.png").addClass('ship').appendTo($('.shipContainer'));
				self.content.find('.shipContainer').removeClass("ship-move-right");
			  self.content.find('.shipContainer').addClass("ship-move-left");
		};


		moveLeft();
		var timerShip = setTimeout(function tick() {
			moveRight();
			setTimeout(moveLeft, 120000);
			timerShip = setTimeout(tick, 240000);
		}, 120000);

	}

});
