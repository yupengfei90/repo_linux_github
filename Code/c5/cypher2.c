// cypher2.c -- alters input, preserving non-letters
#include <stdio.h>
#include <ctype.h>
int main(void)
{
	char ch;

	while ((ch = getchar())
		!= '\n' )
	{
		if (isalpha(ch))	// if a letter
			putchar(ch - 1);
		else
			putchar(ch);
	}
	tolower(ch);

	return 0;
}
