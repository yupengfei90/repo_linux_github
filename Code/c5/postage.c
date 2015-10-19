// postage.c -- first-class postage rates
#include <stdio.h>
int main(void)
{
	const int FIRST_0Z = 37;
	const int NEXT_0Z = 23;
	int ounces, cost;

	printf("    counces   cost\n");
	for (ounces = 1, cost = FIRST_0Z; ounces <= 16; ounces ++, cost += NEXT_0Z)
		printf("%5d %10.2f\n", ounces, cost/100.00);

	return 0;
}
