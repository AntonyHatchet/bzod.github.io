define({
	render: function() {
		this.content = this.html.find('#content');
		this.menu = this.html.find('#menu');
		this.accordion = this.accordion.find('#accordion');

		$('body').html('').append(this.content, this.menu);
		$('#content').append(this.accordion);
		this.subscribe();
	},
	subscribe: function() {
		var self = this;
		this.menu.find('.leftSide .icon').on('click', function() {
			self.menu.find('.leftSide .leftMenu').toggleClass('hide');
		});

		this.accordion.find('li').on('click', function(e) {
			self.accordion.find('li.active').toggleClass('active');
			console.log(e.target)
			self.accordion.find(e.target).toggleClass('active');
		});


	},
});