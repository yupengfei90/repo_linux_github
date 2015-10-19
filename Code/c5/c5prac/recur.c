/* recur.c */
#include <stdio.h>
void up_and_down(int n);

int main(void)
{
	up_and_down(0);	

	return 0;
}

void up_and_down(int n)
{
	printf("Level %d  location %p\n", n, &n);
	if (n < 4)
		up_and_down(n+1);
	printf("LEVEL %d  location %p.\n", n , &n);
}
