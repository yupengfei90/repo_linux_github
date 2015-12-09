#!/bin/bash 
# Show diffrent colors with /bin/echo -e 
for ((color=30; color<38; color=color+1))
do
{
case $color in
	"30")
/bin/echo -e "\e[1;"$color"m Black \e[0m"
	;;
	"31")
	 /bin/echo -e "\e[1;"$color"m Red\e[0m"
	;;
    "32")
	 /bin/echo -e "\e[1;"$color"m Green \e[0m"
	;;
	"33")
	/bin/echo -e "\e[1;"$color"m Yellow \e[0m"
	;;
	"34")
	/bin/echo -e "\e[1;"$color"m Blue \e[0m"
	;;
	"35")
	/bin/echo -e "\e[1;"$color"m Magenta \e[0m"
	;;
	"36")
	/bin/echo -e "\e[1;"$color"m Cyan \e[0m"
	;;
	"37")
	/bin/echo -e "\e[1;"$color"m White \e[0m"
	;;
*)
	exit 1
	;;
esac
}
done
