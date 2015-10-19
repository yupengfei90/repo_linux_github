/* invert4.c -- using bit operations to display binary */
#include <stdio.h>
char * itobs(int, char *)
void show_bstr(const char *);
int invert_end(int num, int bits)
{
	int mask = 0;
	int bitval = 1;

	while (bits-- > 0)
	{
		mask |= bitval;
		bitval <<= 1;
	}

	return num ^ mask;
}
