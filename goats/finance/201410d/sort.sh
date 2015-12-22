#!/bin/bash

for i in $(cat sort)
do
	cat 201410 | grep "$i"| awk 'BEGIN{a=0}{a+=$3;print $0}END{print "sum	" a}'>> sum

done
