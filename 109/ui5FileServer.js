var multiparty = require('multiparty');
var http = require('http');
//var util = require('util');
const PORT = 3001;

http.createServer(function(req, res) {
  if (req.url === '/upload' && req.method === 'POST') {
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
      var aResult = [];
      var aUploaded = files.myFileUpload;
      for( var i = 0; i < aUploaded.length; i++){
        console.log('file name: ', aUploaded[i].originalFilename, 'size: ' , aUploaded[i].size);
        aResult.push({
          name: aUploaded[i].originalFilename,
          size:aUploaded[i].size
        });
      }
      //res.writeHead(200, { 'content-type': 'application/json' });
      //res.end(JSON.stringify(aResult));
      res.writeHead(200, { 'content-type': 'text/html' });
      res.end("<p>File uploaded ok!</p>");
      //res.end(util.inspect({ fields: fields, files: files }));
    });
    return;
  }
}).listen(PORT);

console.log('listen on port:' + PORT);