// colddays.c -- finds percentage of days below freezing
#include <stdio.h>
#define SIZE 10
int main(void)
{
	const int FREEZING = 0;
	int temperature[SIZE];
	int cold_days = 0;
	int all_days = 0;
	int index;

	printf("Enter the list of daily low temperatures.\n");
	printf("Use Celsius, and enter q to quit.\n");
	for (index=0; index<SIZE; index++)
	{
		while (scanf("%f", &temperature[index]) == 1)
		{
			all_days ++;
			if (temperature[index] < FREEZING)
				cold_days++;
		}
	}
	if (all_days != 0){
		printf("The entered %d temperature are as follows:\n", SIZE);
		for (index = 0; index < SIZE; index++)
		{
			printf("%5.1d", temperature[index]);
		}
		printf("\n");
		printf("%d days total: %.1f%% were below freezing.\n", 
			all_days, 100.0 * (float) cold_days / all_days);
	}
	if (all_days == 0)
		printf("No data entered!\n");

	return 0;
}
