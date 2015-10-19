// break.c -- uses break to exit a loop
#include <stdio.h>
int main(void)
{
	float length, width;

	do
	{
		printf("Enetr the length of the rectangle:\n");
		scanf("%f", &length);
		printf("Length = %.2f:\n", length);
		printf("Enetr its width:\n");
		if (scanf("%f", &width) != 1)
			break;
		printf("Width = %.2f:\n", width);
		printf("Area = %.2f:\n", length * width);
	} while (scanf("%f", &length) == 1);
	printf("Done.\n");

	return 0;
}
