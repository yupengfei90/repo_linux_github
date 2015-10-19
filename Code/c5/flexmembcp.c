/* flexmembcp.c -- flexible array members */
#include <stdio.h>
#include <stdlib.h>  // for malloc() and free();

struct flex {
	int count;
	double average;
	double score[];
};

void showflex(const struct flex *);

int main(void)
{
	int n;
	struct flex * fp;
	int i;
	double sum = 0.0;

	printf("Please enter the flexible number (q to quit) :\n");
	while ((scanf("%d", &n) == 1))
	{
		fp->count = n;
		fp = malloc(sizeof (struct flex) + 
					n * sizeof(double));
		for (i = 0;i < n; i++)
		{
			fp->score[i] = 20.0 - 1.0/i;
			sum += fp->score[i];
		}
		fp->average = sum / n;
		showflex(fp);
		
		sum = 0.0;	// clean up, begin for next n enter
		printf("Please enter the flexible number (q to quit) : \n");

	}
	free(fp);

	return 0;
}

void showflex(const struct flex * fpt)
{
	int i;
	
	puts("Here's the scores:");
	for (i = 0; i < fpt->count; i++)
	{
		printf("%.2g ", fpt->score[i]);
	}
	putchar('\n');
	printf("average = %.2g", fpt->average);
	
}
