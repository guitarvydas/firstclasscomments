// 'var xxx;' belongs to the 'global' scope in browsers, but to the module local scope in node.js
// see https://nodejs.org/api/globals.html#globals_global

var atob = require ('atob'); // npm install atob
var pako = require ('pako'); // npm install pako


exports.decodeMxDiagram = (encoded) => {
    var data = atob (encoded);
    var inf = pako.inflateRaw (
	Uint8Array.from (data, c=>c.charCodeAt (0)), {to: 'string'})
    var str = decodeURIComponent (inf);
    return str;
}

exports.expandStyle = (s) => {
    var sx = s
	.replace(/"/g,'')
	.replace(/ellipse;/g,'kind=ellipse;')
	.replace(/text;/g,'kind=text;')
	.replace (/([^=]+)=([^;]+);/g, '$1="$2" ');
    return sx;
}

exports.resetNames = () => {
    nameIndexTable = [];
    counter = 1;
}

exports.strMangle = (s) => {
        // remove HTML junk added by drawio
    var ret = s
	.replace (/&[^ ]+;/g, '\n')
	.replace (/\\\\/g, '');

    return ret
        // convert names to be acceptable to SWIPL
	.replace (/-/g, '__')
	.replace (/\\/g, '\\\\')

	.replace (/ __g /g, ' -g ')
	.replace (/__q/g, '-q');
}



var nameIndexTable = [];
var counter = 1;



function newID(name, quoteds, scope) {
    var s = stripQuotes (quoteds);
    scope.scopeModify (name, s);
    nameIndexTable[s] = counter;
    counter += 1;
    return '';
}

function pushID (name, s, scope) {
    scope.scopeModify (name, stripQuotes (s));
    return '';
}

function getID (name, scope) {
    var s = scope.scopeGet (name);
    return refID (s);
}


/// cells
exports.newCellID = (s, scope) => {
    return newID ('cellid', s, scope);
}

exports.pushCellID = (s, scope) => {
    return pushID ('cellid', s, scope);
}

exports.getCellID = (scope) => {
    return getID ('cellid', scope);
}

exports.refCellID = (s) => {
    return refID (s);
}

/// diagrams
exports.newDiagramID = (s, scope) => {
    return newID ('diagramid', s, scope);
}

exports.pushDiagramID = (s, scope) => {
    return pushID ('diagramid', s, scope);
}

exports.getDiagramID = (scope) => {
    return getID ('diagramid', scope);
}


exports.setDiagram = (scope) => {
    var diagramID = getID (scope);
    scope.scopeAdd ('diagram', diagramID);
}

exports.namify = (s) => {
    return s
	.trim ()
	.replace (/"/g,'')
	.replace (/ /g,'__');
}


function refID (s, scope) {
    // produce smaller ID's (useful for debugging workbench)
    var n = nameIndexTable[s];
    if (n) {
	return "id" + n.toString();
    } else {
	return s;
    }
}    

function stripQuotes (s) {
    return s;
}

exports.stripQuotes = (s) => {
    return stripQuotes (s);
}

exports.mangleNewlines = (s) => {
    return s.replace (/(\r\n|\r|\n)/g,'@~@');
}
