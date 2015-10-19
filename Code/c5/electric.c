// electric.c -- calculates electric bill
#include <stdio.h>
#define RATE1 0.12589	// rates for first 360 kwh
#define RATE2 0.17901	// rate for next 320 kwh
#define RATE3 0.20971	// rate for over 680 kwh
#define BREAK1 360		// first break point for rates
#define BREAK2 680		// second breakpoint for rates
#define BASE1 (RATE1 * BREAK1)
						// cost for 360 kwh
#define BASE2 (BASE1 + (RATE2 * (BREAK2 - BREAK1)))
						// cost for 680 kwh
int main(void)
{
	double kwh;
	double bill;

	printf("Please enter the kwh used.");
	printf("Enetr q to quit.\n");
	while (scanf("%lf", &kwh)){
	if (kwh <= BREAK1)
		bill = RATE1 * kwh;
	else if (kwh <= BREAK2)
		bill = BASE1 + (RATE2 * (kwh - BREAK1));
	else
		bill = BASE2 + (RATE3 * (kwh - BREAK2));
	printf("The charge for %.1f kwh is $%1.2f.\n", kwh, bill);
}
	printf("Hope you enjoy this calculate trip. -- bye!\n");
	return 0;
}
