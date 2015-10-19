# 将心单词写入/root/newwords文件中
#!/bin/bash
echo "Please enter new words: "
read new
echo $new >> /root/newwords

