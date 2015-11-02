define({

	renderVideo: function(videoName) {
		this.loadVideo(videoName);
		return this.videoHtml;
	},

	loadVideo: function(videoName){
		var self = this;
		var myStorage = localStorage;
		require([
			'text!../../../content/video/' + videoName + '.json'
		], function(json) {

			console.debug('Видео "' + videoName + '" загружено 1');
			self[videoName] = JSON.parse(json);
			console.debug('Видео "' + videoName + '" загружено 2');
			self.createVideoPage(self,videoName);
		});
	},

	createVideoPage: function(self,videoName){
		var video = self[videoName];
		console.debug('Видео "' + videoName + '" загружено 3');
		var page = self.renderHandlebarsTemplate("#videoTemplate",video);
		console.debug('Видео "' + videoName + '" загружено 4');
		self.videoHtml.html(page);
		console.debug('Страница добавлена');
	},
});