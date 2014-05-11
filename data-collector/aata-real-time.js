var cheerio = require('cheerio');
var moment = require('moment');
var request = require('request');

var requestPage = function(route_id, callback) {
	request('http://mobile.theride.org/rideguide_m.asp?route=' + route_id, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(body);
		}
	});
};

var parseBody = function(body) {
	var $ = cheerio.load(body);
	console.log($('font font').text());
	console.log($('font > font').text());
	console.log(('font').text());
};