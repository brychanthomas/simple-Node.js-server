var http = require('http');
var fs = require('fs');

function request_handler (request, response) {
	let page = request.url.slice(1)
	if (page === '') {page = 'index.html'}
	let fileType = page.split(".")
	fileType = fileType[fileType.length-1]
	console.log(request.headers.host + request.url);
	fs.readFile(page, function(err, data) {
		if (err) {
			response.statusCode = 404;
			response.end();
		} else if (fileType === 'png' || fileType === 'jpg' || fileType === 'gif'){
			response.setHeader('Content-Type', 'image');
			response.write(data, 'binary');
			response.end();
		} else {
			response.setHeader('Content-Type', 'text/html');
			response.write(data);
			response.end();
		}
	});
};
	
http.createServer(request_handler).listen(80);