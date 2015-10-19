#!/bin/bash
# find out the up host 
netip=100.65.219
for hostip in $(seq 1 100)
do
	ip=$netip.$hostip
	ping ip -c2 -W2 &> /dev/null
#	if [ $? == 0 ]; then
#		echo "$ip is UP"
#	fi
done
