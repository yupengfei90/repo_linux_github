/* pizza.c -- uses defined constants in a pizza context */
#include <stdio.h>
#define PI 3.14159
int main(void)
{
	float area, circum, radius;

	printf("Please enter your pizza radius:\n");
	scanf("%f",&radius);
	area = PI * radius * radius;
	circum = 2 * PI * radius;
	printf("Your basic pizza parameters are as follows:\n");
	printf("circumferrence = %3.2f, area = %3.2f\n", circum, area);

	return 0;
}
