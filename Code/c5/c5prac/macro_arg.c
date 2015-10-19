// macro-arg.c -- 带参数的宏
#include <stdio.h>
#define SQUARE(X) X*X
#define PR(X) printf("The result is %d.\n", X)
int main(void)
{
	int x =4;
	int z;

	printf("x=%d\n",x);
	z = SQUARE(x);
	PR(z);

	return 0;
}
