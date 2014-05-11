var cheerio = require('cheerio');
var moment = require('moment');
var request = require('request');
var _ = require('underscore');

var requestPage = function(route_id, callback) {
	request('http://mobile.theride.org/rideguide_m.asp?route=' + route_id, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			callback(body);
		}
	});
};

var parseBody = function(body) {
	var $ = cheerio.load(body);
	var node = $('font font');
	node.children().remove('a, font, form');
	text = node.html().substring(4).slice(0, -12);
	text = _.unescape(text);
	console.log(text);
	console.log(getData(text));
};

var getData = function(rawData) {
	results = {};
	strings = rawData.split('<br>');
	var status = getStatus(strings[0]);
	results.status = status.status;
	results.direction = status.direction;
	results.currentLocation = strings[1].substring(2);

	var arrivalDetails = strings[2].split(' ');
	results.nextArrivalTime = arrivalDetails.pop();
	results.nextLocation = arrivalDetails.join(' ');
	return results;
};

var getStatus = function(status) {
	var onTime = status.indexOf(' On time');
	var startIdx = status.indexOf(' ') + 1;
	var results = {};
	if (onTime !== -1) {
		results.status = 'on time';
		results.direction = status.substring(startIdx, onTime);
	}
	else {
		var minIdx = status.lastIndexOf(' ', status.lastIndexOf(' min ') - 1);
		results.direction = status.substring(startIdx, minIdx);
		results.status = status.substring(minIdx + 1);
	}
	return results;
};

var test = function() {
	requestPage(2, parseBody);
};

test();