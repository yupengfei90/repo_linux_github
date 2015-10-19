// for_ch.c -- print ch a-z and it's ASCII value
#include <stdio.h>
int main(void)
{
	int ch;

	for(ch = 'a'; ch <= 'z'; ch++)
		printf("%c ASCII value is %d.\n", ch, ch);

	return 0;
}
