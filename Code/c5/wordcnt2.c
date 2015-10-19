// wordcnt2.c -- counts characters, words, and lines
#include <stdio.h>
#include <ctype.h>		// for isspace()
#include <stdbool.h>	// for bool, true, false
#define STOP '|'		// define input over character
int main(void)
{
	char c;				// character read in
	long n_chars = 0L;	// number of characters
	int n_words, n_lines;
	bool wordin false;	// == true if c is in a word
	
	printf("Enter text to be analysis (| to terminate):\n");
	while ((c = getchar()) != '|')
	{
		n_chars++;		// count characters
		if (c = '\n')
			n_lines++;	// count lines
		if (!isspace(c) && !wordin)
		{
			n_words++;	// words count begin
			wordin = true;
		}
		if (isspace(c))
			wordin = false;
	}
	
	printf("The text you enter in has %ld characters, %d words, %d lines\n",			n_chars, n_words, n_lines);
	return 0;
}
