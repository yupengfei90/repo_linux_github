// swapcp.c -- using pointers to make swapping work
#include <stdio.h>
void interchange(int * u, int * v);
int main(void)
{
	int x = 5;
	int y = 10;

	printf("Original x = %d, y = %d.\n", x, y);
	interchange(&x, &y);	// send addresses to  funcition
	printf("Now x = %d, y = %d.\n", x, y);

	return 0;
}

void interchange(int * u, int * v)
{
	int temp;

	temp = *u;	// temp get value that u point to
	*u = *v;
	*v = temp;
}
