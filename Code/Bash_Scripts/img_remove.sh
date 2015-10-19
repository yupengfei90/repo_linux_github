#!/bin/bash
# img_remove.sh
# 移除刚才通过img_downloader下载的文件

for img in $(cat ./img.list)
do
	img=${img##*/}
	rm -f  $img
	
done
