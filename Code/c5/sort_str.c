/* sort_str.c -- reads in strings and sorts them */
#include <stdio.h>
#include <string.h>
#define SIZE 81		// string length limit, including \0
#define LIM 20		// maximum number of lines to be read
#define HALT ""		// null string to stop input
void stsrt(char * strings[], int num);	// string-sort function

int main(void)
{
	char input[LIM][SIZE];	// array to store input
	char *ptstr[LIM];		// array of pointer variables
	int ct = 0;				// input count
	int k;					// output count

	printf("Input up tp %d lines, and I will sort them.\n", LIM);
	printf("To stop, press the Enter key at a line's start.\n");
	while (ct < LIM && gets(input[ct]) != NULL 
					&& input[ct][0] != '\0')
	{
		ptstr[ct] = input[ct];	// set pointers to strings
		ct++;
	}
	stsrt(ptstr, ct);
	puts("\nHere's the sorted list:\n");
	for (k = 0; k < ct; k++)
		puts(ptstr[k]);			// sorted pointers

	return 0;
}

/* string-pointer-sorting function */
void stsrt(char *ptstr[], int ct)
{
	char * temp;
	int top, seek;

	for (top = 0; top < ct -1; top++)
		for (seek = top + 1; seek < ct; seek++)
			if (strcmp(ptstr[top], ptstr[seek]) > 0)
			{
				temp = ptstr[top];
				ptstr[top] = ptstr[seek];
				ptstr[seek] = temp;
			}
}

