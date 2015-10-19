/* hellocp.c -- converts command-line arguments to number */
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
	int i;

	if (argc < 2 || atoi(argv[1]) < 1)
		printf("Usage: %s positive-integer\n", argv[0]);
	else
		for (i =1; i <= atoi(argv[1]); i++)
			puts("Hello World");


	return 0;
}
