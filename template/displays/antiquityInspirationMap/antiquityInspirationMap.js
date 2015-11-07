define({
	render: function() {
		this.content = this.html;
		var menu = this.renderMenu();
		var test = this.renderTest('antiquityInspiration');
		this.content.append(test);
		$('body').html('').append(this.content, menu);

		this.subscribe();
		this.buildDonePoints();
		this.animatePoints();
		this.animateClouds();
		this.animateShip();
	},

	subscribe: function() {
		var self = this;

		this.testBreadcrumbsRender('antiquityInspiration');
	},

	buildDonePoints: function(){
		var data = JSON.parse(localStorage.antiquityInspiration);
		data.questions.forEach(function(item, i){
			if (item.status){
				console.log("id=", item.id, " status=", item.status);
				$("." +item.id + "").addClass("done");
				console.log("добавляем done к", "." +item.id + "");
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

		elementsArray.forEach(function(item, i, arr) {
			moveElementTowards(item, getRandomArrayElement(directionArray))
		});

		setInterval(function(){
				elementsArray.forEach(function(item, i, arr) {
					moveElementTowards(item, getRandomArrayElement(directionArray))
				}
			)}, 20000);


	},

	animatePoints: function(){

		function zoomIn(){
				$(".animatePoint").css("transform", "scale(1)");
		};

		function zoomOut(){
			  $(".animatePoint").css("transform", "scale(0.5)");
		};

		var timerId = setTimeout(function tick() {
			zoomOut();
			setTimeout(zoomIn,1000);
			setTimeout(zoomOut, 2000);
		  timerId = setTimeout(tick, 15000);
		}, 15000);

	},

	animateShip: function (){

		function moveRight(){
				$('.shipContainer').removeClass("ship-move-left");
			  $('.shipContainer').addClass("ship-move-right");
		};
		function moveLeft(){
				$('.shipContainer').removeClass("ship-move-right");
			  $('.shipContainer').addClass("ship-move-left");
		};


		moveLeft();
 		setTimeout(moveRight, 120000);

		//setInterval(function(){ moveRight() }, 12000);
	}

});
