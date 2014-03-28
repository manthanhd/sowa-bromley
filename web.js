var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello World! Welcome to mongo.ws!');
});


app.get('/search', function(req, res) {
	var mongo = require("mongodb");
	var mongoUri = process.env.MONGOLAB_URI ||
		  process.env.MONGOHQ_URL ||
		  'mongodb://localhost/mydb';
	
	mongo.Db.connect(mongoUri, function (err, db) {
	  db.collection('twitch', function(er, collection) {
	    collection.find().toArray(function (err, docs) {
		res.send("Found " + docs.length + " twitches.");
	    });
	    
	  });
	});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
