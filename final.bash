#!/bin/bash


top__level () {
 
 process__A
process__B
 }

process__A () {
 
 c3
 }

c3 () {
@~@echo hello@~@echo ... from process A@~@ 
  }

process__B () {
 
 c4
 }

c4 () {
@~@echo ... from process B@~@echo goodbye@~@ 
  }
process__A
process__B
