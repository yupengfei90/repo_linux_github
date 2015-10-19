// sweetie1.c -- a counting loop
#include <stdio.h>
int main(void)
{
	const int NUMBER = 22;
	int count = 1;	// initialization

	while (count++ <= NUMBER)
	{
		printf("Valentine!\n");
	}

	return 0;
}
