var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.write("<html><body><p>");
  res.write('Hello World! This is awesome speaking. Yes. Awesome.');
  res.write("<br/>");
  res.write("Use /mongo.ws/search and pass params like searchText, resultsCount and pageNumber in order to query posts from mongodb.");
  res.write("</p></body></html>");
  res.end();
});

app.get('/mongo.ws', function(req, res) {
  res.send('Hello World! Welcome to mongo.ws!');
});


app.get('/mongo.ws/search', function(req, res) {
  if(typeof req.query.searchText !== 'undefined' && typeof req.query.resultsCount !== 'undefined' && typeof req.query.pageNumber !== 'undefined'){
	// Request is valid.
	var searchText = req.query.searchText;
	var resultsCount = req.query.resultsCount;
	var pageNumber = req.query.pageNumber;
	res.write("<html><body><p>");
	res.write("searchText: " + searchText + "<br/>");
	res.write("resultsCount: " + resultsCount + "<br/>");
	res.write("pageNumber: " + pageNumber + "<br/>");
	res.write("</p></body></html>");
	res.end();
  } else {
  	res.send('Hello World! Welcome to mongo.ws!"' + req.query.searchText + '"');
  }
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
