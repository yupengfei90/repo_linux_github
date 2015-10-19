#include <stdio.h>
int main(void)
{
	unsigned width, precision;
	int number = 256;
	double weight = 242.5;

	printf("What field width?\n");
	scanf("%d", &width);
	printf("The number is %*d: \n", width, number);


	return 0;

}
