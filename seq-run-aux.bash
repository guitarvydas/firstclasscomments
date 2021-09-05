#!/bin/bash
swipl -g 'consult(fb).' \
      -g 'consult(boundingBoxes).' \
      -g 'printBB.' \
      -g 'halt.' \
      >temp2.pl

# augment the factbase (fb.pl) after every inferencing step
cat fb.pl temp2.pl | sort >temp3.pl
mv temp3.pl fb.pl

##### containment inferencing #########

#_details_
allContains1 (){
swipl -g 'consult(fb).'  -g 'consult(onSameDiagram).' -g 'consult(contain1).' -g 'allContains1.' -g 'halt.' | ./augment-fb.bash 
}
printAllDeepContains (){
swipl -g 'consult(fb).'  -g 'consult(onSameDiagram).' -g 'consult(contain2).' -g 'printAllDeepContains.' -g 'halt.' | ./augment-fb.bash 
}
printAllDirectContains (){
swipl -g 'consult(fb).'  -g 'consult(onSameDiagram).' -g 'consult(contain3).' -g 'printAllDirectContains.' -g 'halt.' | ./augment-fb.bash 
}
designRuleRectanglesMustNotIntersectOnTheSameDiagram (){
swipl -g 'consult(fb).'  -g 'consult(onSameDiagram).' -g 'consult(designRuleRectanglesMustNotIntersect).' -g 'designRuleRectanglesMustNotIntersectOnTheSameDiagram.' -g 'halt.' | ./check-design-rule.bash 
}
printAllPortContains (){
swipl -g 'consult(fb).'  -g 'consult(onSameDiagram).' -g 'consult(containsport).' -g 'printAllPortContains.' -g 'halt.' | ./augment-fb.bash 
}
printAllDirections (){
swipl -g 'consult(fb).'  -g 'consult(onSameDiagram).' -g 'consult(portdirection).' -g 'printAllDirections.' -g 'halt.' | ./augment-fb.bash 
}

# pipeline
allContains1
cp fb.pl _seq1.pl
printAllDeepContains
cp fb.pl _seq2.pl
printAllDirectContains
cp fb.pl _seq3.pl
designRuleRectanglesMustNotIntersectOnTheSameDiagram
cp fb.pl _seq4.pl
printAllPortContains
cp fb.pl _seq5.pl
printAllDirections
cp fb.pl _seq6.pl


# convert fb.pl to "structured" form
swipl -g 'use_module(library(http/json))' \
      -g 'consult(fb).' \
      -g 'consult(seq_component).' \
      -g 'consult(jsoncomponent).'\
      -g 'allc.'\
      -g 'halt.'
