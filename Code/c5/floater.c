/* floaterr.c -- displays round-off error */
#include <stdio.h>
int main(void)
{
	float a, b;

	b = 2.0e4 + 1.0f;
	a = b - 2.0e4;
	printf("%f\n", a);

	return 0;
}
