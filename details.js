var transpiler = require('./transpiler.js');
var pl = require('./pl.js');

function pipeline () {
    var inputFile = process.argv[2];
    var drawioUncompressed = transpiler.ftranspile (inputFile, 'drawio.ohm', 'drawio.glue', 'uncompress');
    var stylesExpanded = transpiler.stranspile (drawioUncompressed, 'styleexpander.ohm', 'styleexpander.glue', 'expand styles');
    var attributesElided = transpiler.stranspile (stylesExpanded, 'attributeelider.ohm', 'attributeelider.glue', 'elide attributes');
    var symbolTable = transpiler.stranspile (attributesElided, 'nametable.ohm', 'nametable.glue', 'symbol table');
    var factbase = transpiler.stranspile (attributesElided, 'emitFactbase.ohm', 'emitFactbase.glue', 'factbase');

    // sort (as written) only works with lines, multiple lines need to have newlines temporarily replaced by @~@
    var flattenedNewlines = transpiler.stranspile (factbase, 'facts.ohm', 'flattenNewlines.glue', 'flatten newlines');
    var sortedFactbase = pl.plsort (flattenedNewlines);
    console.log (sortedFactbase);

}

pipeline ();

// function unflatten (s) {
//     return s.replace (/(@~@)/g,'\n');
// }
