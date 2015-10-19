/* manybook.c -- multiple book inventory */
#include <stdio.h>
#define MAXTITL 40
#define MAXAUTL 40
#define MAXBKS 100

struct book
{
	char title[MAXTITL];
	char author[MAXAUTL];
	float value;
};

int main(void)
{
	struct book library[MAXBKS];	// array of book structures
	int count = 0;
	int index;

	printf("Please enter the book title.\n");
	printf("Please [enter] at the start of a line to stop.\n");
	while (count < MAXBKS && gets(library[count].title) != NULL
						&& library[count].title[0] != '\0') 
	{
		printf("Now enter the author.\n");
		gets(library[count].author);
		printf("Now enter the value.\n");
		scanf("%f", &library[count].value);
		while (getchar() != '\n')
			continue;
		count++;
		if (count < MAXBKS)
		printf("Enter the next title.\n");
	}

	if (count > 0)
	{
		puts("Here is the booklist: ");
		for (index = 0; index < count; index++)
			printf("%s by %s : %.2f\n", library[index].title, 
				library[index].author, library[index].value);
	}
	else
		printf("Too bad. No book.\n");

	return 0;
}

