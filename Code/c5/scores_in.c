// scores_in.c -- uses loops for array processing
#include <stdio.h>
#define SIZE 10
#define PAR 72
int main(void)
{
	int index, score[SIZE];
	int sum = 0;
	float average;

	printf("Enter %d golf scores: \n", SIZE);
	for (index = 0; index < SIZE; index++)	// read in scores
		scanf("%d", &score[index]);
	printf("The scores enter in are as follows:\n");
	for (index = 0; index < SIZE; index++)	// display entered scores
		printf("%5d", score[index]);
	printf("\n");
	for (index = 0; index <SIZE; index++)	// add them up
		sum += score[index];
	average = (float)sum / SIZE;			// time-honored method
	printf("Sum of scores = %d, average = %.2f\n", sum, average);
	printf("That's a handicap of %.0f.\n", average -(float) PAR);
	

	return 0;
}
