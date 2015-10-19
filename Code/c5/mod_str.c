/* mod_str.c -- modifies a string */
#include <stdio.h>
#include <ctype.h>
#define LIMIT 80
void ToUpper(char *);
int punctcount(const char *);

int main(void)
{
	char line[LIMIT];

	puts("Please enter a line:");
	gets(line);
	ToUpper(line);
	puts(line);
	printf("That line has %d punctuation characters.\n",
			punctcount(line));

	return 0;
}

void ToUpper(char * line)
{
	while (*line)
	{
	*line = toupper(*line);
	line++;
	}
}

int punctcount(const char * line)
{
	int ct = 0;
	while (*line)
	{
	if (ispunct(*line))
		ct++;
	line++;
	}

	return ct;
}
