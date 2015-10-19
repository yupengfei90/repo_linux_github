#! /bin/sh
# 输入密码时不向终端显示

echo -e "Enter Password: "
stty -echo
	read password
stty echo
	echo
	echo "Password read."
