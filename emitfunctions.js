
var transpiler = require ('./transpiler.js');

function pipeline () {
    var functions = transpiler.ftranspile ('details.json', 'emitfunctions.ohm', 'emitfunctions.glue', 'emit functions');
    console.log (functions);
}
pipeline ();
