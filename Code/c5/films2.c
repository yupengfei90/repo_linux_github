/* films2.c -- using a linked list of structures */
#include <stdio.h>
#include <stdlib.h>		// for malloc() prototype
#include <string.h>		// for strcpy() prototype
#define TSIZE	45		// maximum size of title

struct film {
	char title[TSIZE];
	int rating;
	struct film * next;	// points to next struct in list
};

int main(void)
{
	struct film * head = NULL;
	struct film * pre, * current;
	char input[TSIZE];

/* gather and store information */
	puts("Enter first movie title:");
	while (gets(input) != NULL && input[0] != '\0')
	{
		current = (struct film *) malloc(sizeof(struct film)) ;
		if (head == NULL)		// first structure
			head = current;
		else
			pre->next = current;
		current->next = NULL;
		strcpy(current->title, input);
		puts("Enter your rating <0-10>:");
		scanf("%d", &current->rating);
		while (getchar() != '\n')
			continue;
		puts("Enter next movie title (empty line to quit):");
		pre = current;
	}

/* show list of movies */
	if (head == NULL)
		printf("No data entered.");
	else
		printf("Here is the movie list:\n");
	current = head;
	while (current != NULL)
	{
		printf("Movie:%-45s Rating:	%d\n",
				current->title, current->rating);
		current = current->next;
	}

/* Program done, so free allocated memory */
	current = head;
	while (current != NULL)
	{
		free(current);
		current = current->next;
	}
	puts("Bye!");
	
	return 0;
}

