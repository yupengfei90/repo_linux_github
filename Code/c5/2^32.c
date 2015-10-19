// 2^32.c
#include <stdio.h>
#include <math.h>
#define EXPONENT 2
int main(void)
{
	float power;
	int n;

	for(n=1,power = 1.0; n <= 32; n++, power = pow (2.0, n-1.0))
		printf("%5d %f\n", n, power);
	return 0;
}
