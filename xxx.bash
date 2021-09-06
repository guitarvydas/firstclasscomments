#!/bin/bash
swipl -g 'use_module(library(http/json))' \
      -g 'consult(detfb).' \
      -g 'consult(component).' \
      -g 'consult(names).' \
      -g 'consult(code).' \
      -g 'consult(jsoncomponent).'
