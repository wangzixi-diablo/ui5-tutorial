var request = require('request');
var path = require('path'), express = require('express');
var app = express();
var url = require("url");
var DEFAULTPORT = 8089;
var port = process.env.PORT || DEFAULTPORT;

var express = require('express');
var app = express();

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 9.0.0');
	next();
  });

app.use('/48', express.static(path.join(__dirname, '../48/webapp')));

app.get('/', function(req, res){
   res.send("你好");
});

app.listen(port, function(){
     console.log("App listens on port: " + port);
});