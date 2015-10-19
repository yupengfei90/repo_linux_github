/* lethead1.c */
#include<stdio.h>
#define NAME "GIGATHINK, INC."
#define ADDRESS "101 Megabuck plaza"
#define PLACE "Megapolis, CA 94904"
#define WIDTH 40

void starbar(void);	// 输出一排星号（*）

int main(void)
{
	starbar();
	printf("%s\n",NAME);
	printf("%s\n", ADDRESS);
	printf("%s\n", PLACE);
	starbar();

	return 0;
}

void starbar(void)
{
	int count;

	for(count=1; count <= WIDTH; count++)
		printf("*");
	putchar('\n');
}


