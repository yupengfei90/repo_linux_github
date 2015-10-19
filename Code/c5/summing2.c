/* summing2.c -- caculate the entered integers sum */
#include <stdio.h>
int main(void)
{
	long sum = 0;
	long num;
	short status;
	
	printf("Please enter a integer to be summed (q to quit): ");
	status = scanf("%ld", &num);
	while (status == 1)
	{
		sum = sum + num;
		printf("Please enter next integer to be summed: ");
		status = scanf("%ld", &num);
	}
	printf("Status = %d.\n", status);
	printf("The entered integers sum is %ld.\n", sum);

	return 0;
}
