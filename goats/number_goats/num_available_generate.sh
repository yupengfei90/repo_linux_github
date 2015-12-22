#!/bin/bash
# num_available_generate.sh 
# 从全部的山羊编号中去除死亡编号和现有编号，留下可用的号码

if [ $# != 3 ];then
	echo "Usage $0 num_exist num_dead num_whole"
	exit
fi
cat $1 $2 > num_exist_dead
grep -w -v -f num_exist_dead $3
