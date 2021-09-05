var transpiler = require('./transpiler.js');
var pl = require('./pl.js');

function generatePipeline () {

    var drawioUncompressed = transpiler.ftranspile ('sequence.drawio', 'drawio.ohm', 'drawio.glue', 'uncompress');
    var stylesExpanded = transpiler.stranspile (drawioUncompressed, 'styleexpander.ohm', 'styleexpander.glue', 'expand styles');
    var attributesElided = transpiler.stranspile (stylesExpanded, 'attributeelider.ohm', 'attributeelider.glue', 'elide attributes');
    var symbolTable = transpiler.stranspile (attributesElided, 'nametable.ohm', 'nametable.glue', 'symbol table');
    var factbase = transpiler.stranspile (attributesElided, 'emitFactbase.ohm', 'emitFactbase.glue', 'factbase');
    var sortedFactbase = pl.plsort (factbase);
    console.log (sortedFactbase);

}
generatePipeline ();
