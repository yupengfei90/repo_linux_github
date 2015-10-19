#include <stdio.h>

int main(void)
{
	unsigned char val;
	unsigned char newval;
	val = 2;
	newval = ~val;

	printf("val = %d, ~val = %u.\n", val, newval);

	return 0;
}
