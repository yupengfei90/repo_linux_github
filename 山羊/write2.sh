#!/bin/bash

for i in $(cat /root/as山羊/text|sort|uniq)
do
	a=$(cat /root/as山羊/text | grep "$i" | wc -l)
	if [ "$a" -gt "1" ]; then
		echo $i
	fi
done
