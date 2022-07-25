var multiparty = require('multiparty');
var http = require('http');
var util = require('util');
const PORT = 3003;

http.createServer(function(req, res) {
  if (req.url === '/upload' && req.method === 'POST') {
    var form = new multiparty.Form();

    form.on('part', function(part) {
        console.log(part.filename);
        part.setEncoding('utf8');
        part.on('data',function (chunk){
          console.log(chunk)
        });
        part.on('end',function (){
          console.log('读取结束');
        });
    });
    form.parse(req);
  }

  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="upload your file">'+
    '</form>'
  );
}).listen(PORT);

console.log('listen on port:' + PORT);