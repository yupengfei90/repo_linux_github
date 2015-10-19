/* name1.c -- reads a name */
#include <stdio.h>
#define MAX 81
int main(void)
{
	char name[MAX];	// allot space
	char * ptr;

	printf("Hi, what's your name?\n");
	ptr = fgets(name,MAX, stdin);		
	printf("%s? Ah! %s.\n", name, ptr);

	return 0;
}
