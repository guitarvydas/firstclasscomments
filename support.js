var atob = require ('atob'); // npm install atob
var pako = require ('pako'); // npm install pako
exports.decodeMxDiagram = (encoded) => {
    process.stderr.write ('support.js/decodeMxDiagram\n');
    var data = atob (encoded);
    var inf = pako.inflateRaw (
	Uint8Array.from (data, c=>c.charCodeAt (0)), {to: 'string'})
    var str = decodeURIComponent (inf);
    return str;
}
