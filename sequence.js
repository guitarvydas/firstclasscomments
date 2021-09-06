var transpiler = require('./transpiler.js');
var pl = require('./pl.js');

function generatePipeline () {
    var inputFile = process.argv[2];
    var drawioUncompressed = transpiler.ftranspile (inputFile, 'drawio.ohm', 'drawio.glue', 'uncompress');
    var fs = require ('fs');
    fs.writeFileSync ('_uncompressed.xml', drawioUncompressed, 'utf-8');
    var stylesExpanded = transpiler.stranspile (drawioUncompressed, 'styleexpander.ohm', 'styleexpander.glue', 'expand styles');
    fs.writeFileSync ('_expanded.xml', stylesExpanded, 'utf-8');
    var attributesElided = transpiler.stranspile (stylesExpanded, 'attributeelider.ohm', 'attributeelider.glue', 'elide attributes');
    fs.writeFileSync ('_elided.xml', attributesElided, 'utf-8');
    var symbolTable = transpiler.stranspile (attributesElided, 'nametable.ohm', 'nametable.glue', 'symbol table');
    //console.log (symbolTable);
    var factbase = transpiler.stranspile (attributesElided, 'emitFactbase.ohm', 'emitFactbase.glue', 'factbase');
    var sortedFactbase = pl.plsort (factbase);
    fs.writeFileSync ('_sorted.pl', sortedFactbase, 'utf-8');
    console.log (sortedFactbase);
}

generatePipeline ();
