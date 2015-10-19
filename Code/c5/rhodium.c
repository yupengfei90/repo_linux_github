//rhodium.c -- your weight in rhodium

#include <stdio.h>

int main(void)
{
	float weight;
	float value;

	printf("Are you worth your weight in rhodium?\n");
	printf("Let's check it out. \n");
	printf("Please enter your weight in pounds:");

//get input from user
	scanf("%f",&weight);
//assume rhodium is $770 per ounce
//14.5833 converts pounds avd.
	value = 770.0 * weight * 14.5833;
	printf("Your weight in rhodium is worth %.2f.\n", value);

	return 0;
}
