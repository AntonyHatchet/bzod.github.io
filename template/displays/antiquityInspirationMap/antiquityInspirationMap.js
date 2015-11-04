define({
	render: function() {
		this.content = this.html;
		var menu = this.renderMenu();
		var test = this.renderTest('antiquityInspiration');
		this.content.append(test);

		$('body').html('').append(this.content, menu);

		this.animatePoints();
		this.animateClouds();
		//this.animateShip();
		this.subscribe();
	},

	subscribe: function() {
		var self = this;
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
					console.log('left');
					self.content.find(element).css("top", getRandomInteger(1, 70) + "%");
					self.content.find(element).css("left", getRandomInteger(100, 140) + "%");
					self.content.find(element).addClass("move-left");
					break;
				case 'right':
					console.log('right');
					self.content.find(element).css("top", getRandomInteger(1, 70) + "%");
					self.content.find(element).css("left", -getRandomInteger(10, 40) + "%");
					self.content.find(element).addClass("move-right");
					break;
				case 'up':
					console.log('up');
					self.content.find(element).css("top", getRandomInteger(110, 130) + "%");
					self.content.find(element).css("left", getRandomInteger(1, 80) + "%");
					self.content.find(element).addClass("move-up");
				break;
				case 'down':
					console.log('down');
					self.content.find(element).css("top", -getRandomInteger(40, 60) + "%");
					self.content.find(element).css("left", getRandomInteger(1, 80) + "%");
					self.content.find(element).addClass("move-down");
				break;
			}
		}

		setInterval(function(){
				elementsArray.forEach(function(item, i, arr) {
					moveElementTowards(item, getRandomArrayElement(directionArray))
				}
			)}, 10000);


	},

	animatePoints: function(){

		function zoomIn(){
				$(".pointFinish").addClass("animatePoint").css("transform", "scale(1)");
		};

		function zoomOut(){
			  $(".pointFinish").addClass("animatePoint").css("transform", "scale(0.5)");
		};

		setInterval(function(){ zoomIn() }, 1000);
		setInterval(function(){ zoomOut() }, 2000);

	},

	animateShip: function (){

		function moveRight(){
			  $('.ship').addClass("move-right");
		};
		function moveLeft(){
			  $('.ship').addClass("move-left");
		};

		setInterval(function(){ moveRight() }, 1000);
		setInterval(function(){ moveLeft() }, 10000);

	}

});
