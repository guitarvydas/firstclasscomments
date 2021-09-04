exports.decodeMxDiagram = (encoded) => {
    var data = atob (encoded);
    var inf = pako.inflateRaw (
	Uint8Array.from (data, c=>c.charCodeAt (0)), {to: 'string'})
    var str = decodeURIComponent (inf);
    return str;
}

function expandStyle (s) {
    var sx = s
	.replace(/"/g,'')
	.replace(/ellipse;/g,'kind=ellipse;')
	.replace(/text;/g,'kind=text;')
	.replace (/([^=]+)=([^;]+);/g, '$1="$2" ');
    return sx;
}
function strMangle (s) {
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

function resetNames () {
    nameIndexTable = [];
    counter = 1;
}

/// generic
function newID (name, quoteds) {
    var s = stripQuotes (quoteds);
    scopeModify (name, s);
    nameIndexTable[s] = counter;
    counter += 1;
    return '';
}

function pushID (name, s) {
    scopeModify (name, stripQuotes (s));
    return '';
}

function getID (name) {
    var s = scopeGet (name);
    return refID (s);
}


/// cells
function newCellID (s) {
    return newID ('cellid', s);
}

function pushCellID (s) {
    return pushID ('cellid', s);
}

function getCellID () {
    return getID ('cellid');
}

function refCellID (s) {
    return refID (s);
}

/// diagrams
function newDiagramID (s) {
    return newID ('diagramid', s);
}

function pushDiagramID (s) {
    return pushID ('diagramid', s);
}

function getDiagramID () {
    return getID ('diagramid');
}



// //function refIDFat (s) {
// function refID (s) {
//     return "id_" + reallyStripQuotes(s);
// }

// function refIDTiny (s) {
//     return "id" + s.replace(/"/g,"");
// }

// function refIDBoth (s) {
function refID (s) {
    // use refIDTiny to produce smaller ID's (useful for debugging workbench)
    var n = nameIndexTable[s];
    if (n) {
	return "id" + n.toString();
    } else {
	return s;
    }
}    


function stripQuotes (s) {
    return s;
    //return reallyStringQuotes(s);
}

function reallyStripQuotes (s) {
    return s.replace (/"/g,"");
}


function setDiagram () {
    var diagramID = getID ();
    scopeAdd ('diagram', diagramID);
}


//////// details transpiler //////////

function namify (s) {
    return s
	.trim ()
	.replace (/"/g,'')
	.replace (/ /g,'__');
}

function stripQuotes (s) {
    return s
	.replace (/"/g,'');
}

function stripQuotesAddNewlines (s) {
    var str = stripQuotes (s);
    if (s === '') {
	return s;
    } else {
	return '\n' + stripQuotes (s) + '\n';
    }
}
