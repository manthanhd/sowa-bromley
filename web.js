var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());
app.use(express.urlencoded());
app.use(express.json());

app.get('/', function(req, res) {
  res.send('Hello World! Welcome to mongo.ws!');
});


app.post('/insert', function(req, res) {
	var description = req.body.description;
	var species = req.body.species;
	var age = req.body.age;
	var sex = req.body.sex;
	var postDate = req.body.postDate;
	var lat = req.body.lat;
	var lon = req.body.lon;
	var username = req.body.username;

	var newpost = {
			"username":username,
			"description":description,
			"species":species,
			"age":age,
			"sex":sex,
			"postDate":postDate,
			"lat":lat,
			"lon":lon
			};
	var mongo = require("mongodb");
	var mongoUri = process.env.MONGOLAB_URI ||
		  process.env.MONGOHQ_URL ||
		  'mongodb://localhost/mydb';

	mongo.Db.connect(mongoUri, function (err, db) {
	  db.collection('twitch', function(er, collection) {
	  	collection.insert(newpost, {safe:true}, function(er, rs){
			if(!er) res.send("Success");
			else throw er;
		});
	  });
	});

});
app.get('/search/:colName/:searchTerm', function(req, res) {
	var colName = req.params.colName;
	var searchTerm = req.params.searchTerm;
	//need to work on this.
	var mongo = require("mongodb");
	var mongoUri = process.env.MONGOLAB_URI ||
		  process.env.MONGOHQ_URL ||
		  'mongodb://localhost/mydb';
	
	mongo.Db.connect(mongoUri, function (err, db) {
	  db.collection('twitch', function(er, collection) {
	    collection.find({colName:{$regex:searchTerm, $options:"i"}}).toArray(function (err, docs) {
		//res.send("Found " + docs.length + " twitches.");
		res.send(docs);
	    });
	    
	  });
	});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
