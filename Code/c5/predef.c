/* predef.c -- predefined identifiers */
#include <stdio.h>
#define PN(X) printf( #X " is %s.\n", X)
void why_me();

int main()
{
	PN(__FILE__);
	PN(__DATE__);
	PN(__TIME__);
	PN(__LINE__);
	PN(__func__);
	why_me();
	

	return 0;
}

void why_me()
{
	printf("This function is %s\n", __func__);
	printf("This is line %d.\n", __LINE__);
}
