/* reversecp.c -- display a file in reverse order */
#include <stdio.h>
#include <stdlib.h>
#define LEN 40
int main(void)
{

	puts("Enter a file name to be processed:");
	char file[LEN];
	gets(file);
	FILE * fp;
	if ((fp = fopen(file, "rb")) == NULL)
	{
		printf("Can't open %s\n", file);
		exit(1);
	}

	long last;
	last = ftell(fp);
	long count;
	for(count = last -1; count >=0; count --)
		{
			fseek(fp, count, SEEK_SET);
			putchar(getc(fp));
		}
	putchar('\n');
	fclose(fp);

	return 0;
}
