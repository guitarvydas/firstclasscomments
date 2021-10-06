var atob = require ('atob'); // npm install atob
var pako = require ('pako'); // npm install pako


function decodeMxDiagram (encoded) {
    process.stderr.write ('### support.js/decodeMxDiagram ###\n');
    var data = atob (encoded);
    var inf = pako.inflateRaw (
	Uint8Array.from (data, c=>c.charCodeAt (0)), {to: 'string'})
    var str = decodeURIComponent (inf);
    return str;
}

////

//https://www.digitalocean.com/community/tutorials/how-to-create-a-web-server-in-node-js-with-the-http-module

const http = require ('http');
const https = require ('https');
const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    var requestData = '';
    req.on('data', chunk => {
	requestData += chunk;
    });
    req.on('end', () => {
	console.log ("requestData is: " + data);
	res.setHeader ("Content-Type", "application/json");
	if (req.url === "/decodeMxDiagram") {
	    console.log ("support: decodeMxDiagram");
	    res.writeHead (201);
	    res.end (decodeMxDiagram (requestData));
	} else {
	    console.log ("support: error");
	    res.writeHead (404);
	    res.end (JSON.stringify ({error: "Resource not found"}));
	}
    });
}

const server = http.createServer (requestListener);
server.listen (port, host, () => {
    console.log (`Support server is running on http://${host}:${port}`);
});
