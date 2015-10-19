#!/bin/bash
# 文件名：etc.sh
# 用途：用于从etoc.sinaapp.com获取词汇定义
# 将英文翻译成中文

if [ $# -ne 1 ];then
	echo -e "Usage: $0 WORD"
	exit -1
fi

curl --silent etoc.sinaapp.com/$1
