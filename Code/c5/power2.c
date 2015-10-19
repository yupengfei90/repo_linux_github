// power2.c
#include <stdio.h>
double power(double n, int p);
int main(void)
{
	double xpow, x;
	int exp;

	printf("這是計算n的p次方的函數\n");
	printf("請輸入地數和指數： ");
	while (scanf("%lf%d", &x, &exp) == 2)
		{
		xpow = power(x, exp);
		printf("%.3g to the power %d is %.5g\n", x, exp, xpow);
		printf("Enter another pair number to calculate.");
		printf("q to quit\n");
		}
	printf("Hope you enjoyed this power trip.\n");


	return 0;
}

double power(double p, int n)
{
	int i;
	double pow = 1;
	
	for (i = 1; i <= n; i++)
		pow *= p;
	
	return pow;
}
