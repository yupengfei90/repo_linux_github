/* join_chk.c -- joins two strings, check size first */
#include <stdio.h>
#include <string.h>
#define SIZE 30
#define BUGSIZE 13
int main(void)
{
	char flower[SIZE];
	char addon[] = "s smell like old shoes";
	char bug[BUGSIZE];
	int available;

	puts("What's your favorite flower?");
	fgets(flower,20,stdin);
	if ((strlen(addon) + strlen(flower) +1) <= SIZE)
		strcat(flower, addon);
	puts(flower);
	puts("What's your favorite bug?");
	gets(bug);
	available = BUGSIZE - strlen(bug) - 1;
	strncat(bug, addon, available);
	return 0;
}
