#include <stdio.h>
#include <math.h>
#define PR(X, ...) printf("Arguments" #X ": " __VA_ARGS__)
int main(void)
{
	
	double x = 4;
	double y;

	y = sqrt(x);
	PR(1,"x=%.2f\n", x);
	PR(2,"x=%.2f, y=%.4f\n",x,y);

	return 0;
}
