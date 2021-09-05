#!/bin/bash
# echo TEST INACTIVE
# exit -1
# node --trace-uncaught details.js

## now do details.drawio
node --trace-uncaught details.js >details.pl

swipl -q \
      -g 'consult(details).' \
      -g 'consult(rects).' \
      -g 'printRects.' \
      -g 'halt.' \
      > temp.pl

# augment the factbase (fb.pl) after every inferencing step
cat details.pl temp.pl >fb.pl

#./run-test-aux.bash
#./run-test-aux.bash | ./fixup.bash >details.json
./run-aux.bash | ./fixup.bash >details.json

node --trace-uncaught emitfunctions.js >functions.txt

# debug
mv fb.pl detfb.pl

cat header.txt functions.txt topo.txt trailer.txt >final.bash
./unflattennewlines.bash <final.bash >final2.bash
./final2.bash
