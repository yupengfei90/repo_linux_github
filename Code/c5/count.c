/* count.c -- using standard I/O */
#include <stdio.h>
#include <stdlib.h>		// exit() prototype

int main(int argc, char * argv[])
{
	long count = 0;
	FILE * fp;
	int ch;

	if (argc < 2)
		{printf("Usage: %s filename\n", argv[0]);
		exit(1);}
	if ((fp = fopen(argv[1], "r")) == NULL)
		{printf("Can't open %s\n", argv[1]);
		exit(1);}
	while ((ch = getc(fp)) != EOF)
		{
		putc(ch, stdout);
		count++;
		}
	printf("File %s has %ld characters\n", argv[1], count);
	fclose(fp);

	return 0;
}
