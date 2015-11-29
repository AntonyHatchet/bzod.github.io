define({

	renderCity: function(locationName) {
		this.loadAllCityInfo(locationName);
		return this.cityHtml;
	},

	loadAllCityInfo: function(locationName){
		var self = this;
		var myStorage = localStorage;
		require([
			'text!../../../content/city/'+ locationName +'.json'
		], function(json) {
			if (!json){
				

//console.log("JSON GONE WRONG");
			} else {
				self.city={};
				self.city[locationName] = JSON.parse(json);
				self.createCityPage(self,locationName);
			}

		});
	},

	createCityPage: function(self,locationName){
		var city = self.city[locationName];
		console.log(self.city[locationName]);
		var page = self.renderHandlebarsTemplate("#cityTemplate", city);
		self.cityHtml.html(page);
	},

	removeCityPage: function(){
		var self = this;
		self.content.find("#city").remove();
	}
});
