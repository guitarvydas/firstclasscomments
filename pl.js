exports.plsort = (factbase) => {
    var lines = factbase.split ('\n');
    lines.sort ();
    return lines.join('\n');
}


