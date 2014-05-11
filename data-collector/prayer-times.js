var cheerio = require('cheerio');
var moment = require('moment');
var request = require('request');

request('http://www.mca-aa.org/', function(error, response, body) {
	if (!error && response.statusCode == 200) {
		parseTimes(body);
	} 
});

var parseTimes = function(resBody) {
	var $ = cheerio.load(resBody);
	var tables = $('figure.column.c-one-third table');

	var times = {};
	times.azanTimes = parseTable(tables.first());
	times.iqamaTimes = parseTable(tables.eq(1));
	console.log(times);
};

var parseTable = function(node) {
	var tds = node.find('tr').children();
	var results = {};

	for (var i = 0; i < tds.length; i += 2) {
		results[tds.eq(i).text().trim()] = moment(tds.eq(i + 1).text().trim(),'hh:mma');
	}
	return results;
};