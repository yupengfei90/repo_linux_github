#!/bin/bash
# checkchange.sh

if [ $# -ne 1 ];then
	echo "Usage: $0 URL"
fi

firststart=0	# 非首次运行

if [ ! -e "last.html" ];then
	firststart=1	#首次运行
fi

	curl -s $1 -o recent.html
if [ $firststart -ne 1 ];then
	changes=`diff -u last.html recent.html`
	if [ -z $changes ];then
		echo "Website has no change."
	else
		echo "Changes:"
		echo $changes
	fi
else
	echo "[First run] Archiving.."
fi

if [ $firststart -eq 1 ];then
	cp recent.html ./last.html
	echo "Finish."
else 
	cp recent.html ./last.html
fi
