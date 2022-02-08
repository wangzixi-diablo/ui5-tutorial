var request = require('request');
express = require('express');
var app = express();
var bodyParser = require('body-parser');
var DEFAULTPORT = 3002;
var port = process.env.PORT || DEFAULTPORT;

app.use(bodyParser.text({
	type: 'multipart/mixed'
}));

function getResponseWithType(res,body){
    return {
        content_type: res.headers["content-type"],
        body: body
    };
}
function sendRequest(req) {
	var url = req.url.slice(1);
	console.log('sending request for url: ', url, ' method: ', req.method);
	var oOptionsGet = {
		url: url,
		method: 'GET'
	};
	var oOptionsPost = {
		url: url,
		method: 'POST',
		json:false,
        headers: {
            "content-type": req.get('content-type')
        },
        body: req.body
	};

	var oOptions = req.method != 'POST'? oOptionsGet:oOptionsPost;

	return new Promise(function(resolve,reject){
		if( req.method != 'POST'){
  			request.get(oOptions,function(error,response,body){
				if(error){
	  				console.log("error occurred: " + error);
	  				reject(error);
				}
				resolve(getResponseWithType(response,body));
			});
		}
		else{
			request.post(oOptions,function(error,response,body){
				if(error){
	  				console.log("error occurred: " + error);
	  				reject(error);
				}
				resolve(getResponseWithType(response,body));
			});
		} 
 	});
}

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 9.0.0');
	next();
  });

app.get('/https://services.odata.org/*', function(req, res){
	sendRequest(req).then(function(data){
        var contentType = data.content_type;
		console.log('content type of get response will be set to: ', contentType);
		res.set('Content-Type', contentType);
		res.send(data.body);
	});
});

app.post('/https://services.odata.org/*', function(req, res){
	sendRequest(req).then(function(data){
		var contentType = data.content_type;
		console.log('content type of post response will be set to: ', contentType);
		res.set('Content-Type', contentType );
		res.send(data.body);
	});
});

app.listen(port, function(){
     console.log("Proxy server listens on port: " + port);
});