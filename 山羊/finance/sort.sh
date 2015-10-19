#!bin/bash 

for type in $(cat ./sortfile)
do
cat $PWW | grep 'type' | awk 'BEGIN{a=0}{a+=$3}{print $0}END{print "$type: "a}'>> sum
done
