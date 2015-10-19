/* typesize.c -- prints out type sizes */
#include <stdio.h>
int main()
{
	printf("Type short has a size of %zd bytes.\n", sizeof(short));
	printf("Type int has a size of %zd bytes.\n", sizeof(int));
	printf("Type long has a size of %zd bytes.\n", sizeof(long));
	printf("Type long long has a size of %zd bytes.\n", sizeof(long long));
	printf("Type char has a size of %zd bytes.\n", sizeof(char));
	printf("Type float has a size of %zd bytes.\n", sizeof(float));
	printf("Type double has a size of %zd bytes.\n", sizeof(double));
	return 0;
}
