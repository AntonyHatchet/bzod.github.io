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

			

//console.log('Видео "' + videoName + '" загружено 1');
			self[videoName] = JSON.parse(json);
			

//console.log('Видео "' + videoName + '" загружено 2');
			self.createVideoPage(self,videoName);
		});
	},

	createVideoPage: function(self,videoName){
		var video = self[videoName];
		var page = self.renderHandlebarsTemplate("#videoTemplate",video);
		
		self.videoHtml.html(page);
	},
});