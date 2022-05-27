const http = require('http');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
	switch (req.method) {
		case 'GET':
			fs.createReadStream("test.txt")
			.on('error', (err) => {
				console.log(err);
				res.statusCode = 404;
				res.end("Error " + err.message);
			})
			.pipe(res);
			break;
		case 'DELETE':
			fs.unlink("test.txt", (err) => {
				if (err) {
					res.statusCode = 404;
					res.end("Error " + err.message);
				} else {
					res.end("Ok");
				}
			})
			break;
	}
});

server.listen(3000);