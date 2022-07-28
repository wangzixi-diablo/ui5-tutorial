const express = require('express'),
httpProxy = require('http-proxy'),
fs = require('fs'),
proxy = new httpProxy.createProxyServer();
const PORT = 8085;

const appRoute = {
target: 'http://localhost:8080'
};
const routing = JSON.parse(fs.readFileSync('./odata.json'));

var allowCrossDomain = function(req, res) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Credentials', 'true');
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
res.header('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization, X-Mindflash-SessionID');
// intercept OPTIONS method
if ('OPTIONS' === req.method) {
    res.header(200);
} else {
    var dirname = req.url.replace(/^\/([^\/]*).*$/, '$1');
    var route = routing[dirname]  || appRoute;
    console.log(req.method + ': ' + route.target + req.url);
    proxy.web(req, res, route);
}
};

var app = express();
app.use(allowCrossDomain);
app.listen(PORT);
console.log("Proxy started on http://localhost:" , PORT);