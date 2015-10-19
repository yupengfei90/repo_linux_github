/* checking.c -- validating input */
#include <stdio.h>
#include <stdbool.h>
const int MIN = -1000;	// low limit to range
const int MAX = +1000;	// upper limit to range
// validate that input is an integer
int get_int(void);
// validate that range limits are valid
bool bad_limits(int begin, int end, int low, int high);
// calculate the sum of the squares of the integers
// a through b
double sum_squares(int a, int b);
int main(void)
{
	int start;
	int stop;
	double answer;

	printf("This program computes the sum of the squares of" 
			"integers in a range.\nThe lower bound should not"
			"be less than -1000 and\nthe upper bound should not"
			"be more than +1000.\nEnter the limits (enter 0 for"
			"both limits to quit):\nlower limit: ");
	start = get_int();
	printf("upper limit: ");
	stop = get_int();
	while (start != 0 || stop != 0)
	{
		if (bad_limits(start, stop, MIN, MAX))
			printf("Please try again.\n");
		else
		{
			answer = sum_squares(start, stop);
			printf("The sum of the squares of the integer ");
			printf("from %d to %d is %g.\n", start, stop, answer);
		}
		printf("Enter the limits (enter 0 for both limit to quit):\n");
		printf("lower limit: ");
		start = get_int();
		printf("upper limit: ");
		stop = get_int();
	}
	printf("Done!\n");

	return 0;
}

int get_int(void)
{
	int input;
	char ch;

	while (scanf("%d", &input) != 1)
	{
		while ((ch = getchar()) != '\n')
			putchar(ch);	// dispose of bad input 
		printf(" is not an integer.\nPlease enter an ");
		printf("integer value, such as 25, -178, or 3: ");
	}

	return input;
}

double sum_squares(int a, int b)
{
	double total = 0;
	int i;

	for (i = a; i <= b; i++)
		total += i*i;

	return total;
}

bool bad_limits(int begin, int end, int low, int high)
{
	bool not_good = false;

	if (begin > end)
	{
		printf("%d isn't smaller than %d.\n", begin, end);
		not_good = true;
	}
	if (begin < low || end > high)
	{
		printf("Values is not at the range %d to %d.\n", MIN, MAX);
		not_good = true;
	}

	return not_good;
}
