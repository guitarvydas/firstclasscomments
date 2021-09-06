#!/bin/bash

clear
set -e
trap 'catch' ERR

catch () {
    echo '*** FATAL ERROR ***'
    exit 1
}

# sequence
node --trace-uncaught sequence.js sequence.drawio >sequence.pl

## create rect fact for every vertex that is not an edge/ellipse/text
## sequence.drawio file contains vertexes, and marks all edge and ellipse (and text)
## but does not mark rectangles (the default)
## this pass finds the defaults and creates explicit rect(...) facts
swipl -q \
      -g 'consult(sequence).' \
      -g 'consult(rects).' \
      -g 'printRects.' \
      -g 'halt.' \
      > temp.pl

# augment the factbase (fb.pl) after every inferencing step
cat sequence.pl temp.pl | sort >fb.pl

#./seq-run-aux.bash >sequence.json
./run-aux.bash >sequence.json

regression=`diff -q gold-sequence.json sequence.json`
if [ "" == "${regression}" ]
then
    echo regression OK
else
    echo regression FAIL
    exit 1
fi
    
node --trace-uncaught emittopological.js >topo1.txt
tsort topo1.txt >topo.txt

# debug
mv fb.pl seqfb.pl

## now do details.drawio
node --trace-uncaught details.js details.drawio >details.pl

swipl -q \
      -g 'consult(details).' \
      -g 'consult(rects).' \
      -g 'printRects.' \
      -g 'halt.' \
      > temp.pl

# augment the factbase (fb.pl) after every inferencing step
cat details.pl temp.pl >fb.pl

./run-aux.bash | ./fixup.bash >details.json

node --trace-uncaught emitfunctions.js >functions.txt

# debug
mv fb.pl detfb.pl

cat header.txt functions.txt topo.txt trailer.txt >final.bash
./unflattennewlines.bash <final.bash >final2.bash
./final2.bash
