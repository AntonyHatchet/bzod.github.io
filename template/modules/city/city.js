define({

	renderCity: function(cityName) {
		this.loadCityInfo(cityName);
		return this.cityHtml;
	},

	loadCityInfo: function(cityName){
		var self = this;
		var myStorage = localStorage;
		require([
			'text!../../../content/city/'+ cityName +'.json'
		], function(json) {
			if (!json){
				console.log("JSON GONE WRONG");
			} else {
				self[cityName] = JSON.parse(json);
				self.createCityPage(self,cityName);
			}

		});
	},

	createCityPage: function(self,cityName){
		var city = self[cityName];
		var page = self.renderHandlebarsTemplate("#cityTemplate", city);
		self.cityHtml.html(page);
	},

	removeCityPage: function(){
		var self = this;
		self.content.find("#city").remove();
	}
});
