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

const http = require ('http');
const https = require ('https');
const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    var data = '';
    req.on('data', chunk => {
	data += chunk;
    });
    req.on('end', () => {
	console.log ("data is: " + data);
    });
    res.setHeader ("Content-Type", "application/json");
    if (req.url === "/decodeMxDiagram") {
	console.log ("routes: decodeMxDiagram");
	res.writeHead (200);
	res.end (decodeMxDiagram (data));
    } else {
	console.log ("support: error");
	res.writeHead (404);
	res.end (JSON.stringify ({error: "Resource not found"}));
    }
}

const server = http.createServer (requestListener);
server.listen (port, host, () => {
    console.log (`Server is running on http://${host}:${port}`);
});
    
