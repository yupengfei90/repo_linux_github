/* binary_to_integer.c */
#include <stdio.h>
#include <math.h>

double exchange(int * n);
int main(void)
{
	int  num[8];
	double integer; 
	int i;
	
	puts("Please enter a binary number.(8wei)");
	while (getchar() != EOF)
	{
	scanf("%d %d %d %d %d %d %d %d", num[7], &num[6], &num[5], &num[4], &num[3], &num[2], &num[1], &num[0]);
	putchar('\n');
	integer = exchange(num);
	printf("integer = %.f.\n", integer);
	puts("Please enter a binary number.(8wei)");
	}
	return 0;
}

double exchange(int * n)
{
	int i;
	double total = 0;
	int array;

	for (i=0 ;i<8; i++)
		total += n[i] * pow(2, i);
		
	return total;
}
