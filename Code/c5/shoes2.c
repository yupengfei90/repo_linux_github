/* shoes2.c -- caculates foot length for several size */
#include <stdio.h>
#define SCALE 0.325
#define ADJUST 7.64
int main(void)
{
	float shoe, foot;
	printf("Shoe's size (men's)		foot length\n");
	shoe = 3;
	while(shoe < 18.5)
	{
		foot = SCALE * shoe +ADJUST;
		printf("%10.1f %25.2f\n", shoe, foot);
		shoe = shoe + 1.0;
	
	}

	return 0;
}
