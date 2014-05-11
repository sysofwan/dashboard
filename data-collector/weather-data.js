var request = require('request');
var zipCode = 48105;
var rootApiUrl = 'http://api.wunderground.com/api/90d1e54e0f0746cd/';

var callApi = function(query, callback) {
	var url = rootApiUrl + query + '/q/' + zipCode + '.json';
	request(url, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(JSON.parse(body));
		}
	});
};

var getCurrentCondtion = function(callback) {
	callApi('conditions', callback);
};

var getHourlyForcast = function(callback) {
	callApi('hourly', callback);
};

var getAlerts = function(callback) {
	callApi('alerts', callback);
};

var testAll = function() {
	var callback = function(obj) {
		console.log(obj);
	};
	getCurrentCondtion(callback);
	getHourlyForcast(callback);
	getAlerts(callback);
};
