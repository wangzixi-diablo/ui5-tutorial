var express = require('express');  
var app = express();
const multer = require('multer');
const PORT = 3001;
var multiparty = require("multiparty");

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods","POST,GET,OPTIONS");
    next();
  });

app.post('/upload', multer().any(),function(req, res){

    var sResponse = 'OK';
    //res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.send(JSON.stringify(req.body));
    //res.send(sResponse);
  }
);

app.get('/upload', function(req, res){
    res.send("ok");
 });

app.listen(PORT, function () {
  console.log("Listening on port: " + PORT );
});

   