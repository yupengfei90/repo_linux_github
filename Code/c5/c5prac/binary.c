/* binary.c -- change integer to binary */
#include <stdio.h>
void int_to_bin(int);
int main(void)
{
	puts("Please enter an integer, i will change it to binary(q to quit):");
	int num;
	while (scanf("%d", &num) == 1)
	{
		int_to_bin(num);
		putchar('\n');
	puts("Please enter an integer, i will change it to binary(q to quit):");

	}
}

void int_to_bin(int n)
{
	while (n >= 2)
		int_to_bin(n/2);
	printf("%d",(n % 2));

}
