#!/bin/bash
# 下载网页中的图片
# img_downloader.sh

if [ $# -ne 1 ]; then
	echo "Usage: $0 URL"
	exit -1
fi
url=$1
curl -s $url | egrep -o "<img src=[^>]*>" | sed 's/<img src=\"\([^"]*\)\".*/\1/g' > img.list
for img in $(cat ./img.list)
do
	echo $img | grep 'http'
	if [ $? = 0 ];then
		wget $img 
	else
		wget $url/$img
	fi
done



