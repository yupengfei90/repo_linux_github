#include <stdio.h>
#include <string.h>
#define PRAISE "What a great name!"
int main(void)
{
	char name[40];
	
	printf("Please enter your name:\n");
	scanf("%s", name);
	printf("Well, %s. %s\n", name, PRAISE);
	printf("Your name of %d letters occupies %d memory cells.\n",
	strlen(name), sizeof name);
	printf("The phrase of praise has %d letters", strlen(PRAISE));
	printf("and occupies %d memory cells.\n", sizeof (PRAISE));

	return 0;
}
