#!/bin/bash


top__level () {

process A
process__B

}

process__A () {

code1

}

code1 () {

echo hello
echo ... from process A


}

process__B () {

code2

}

code2 () {

echo ... from process B
echo goodbye


}
process__A
process__B
