
var transpiler = require ('./transpiler.js');

function pipeline () {
    var topological = transpiler.ftranspile ('sequence.json', 'emitsequence.ohm', 'emitsequence.glue', 'topological');
    console.log (topological);
}

pipeline ();
