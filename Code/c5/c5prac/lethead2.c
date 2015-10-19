/* lethead1.c */
#include<stdio.h>
#include<string.h>
#define NAME "GIGATHINK, INC."
#define ADDRESS "101 Megabuck plaza"
#define PLACE "Megapolis, CA 94904"
#define WIDTH 40

void starbar(void);	// 输出一排星号（*）
void printblank(char *);	//根据字符串n的长度以及starbar的长度打印出相应的空格使得字符串居中

int main(void)
{
	starbar();
	printblank(NAME);	// 字符串的内容即是指向字符串首个字母的指针
	printf("%s\n",NAME);
	printblank(ADDRESS);
	printf("%s\n", ADDRESS);
	printblank(PLACE);
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

void printblank(char * string)
{
	int count;
	int width;
	
	width = (WIDTH - strlen(string)) / 2;

	for(count=1;count<=width; count++)
		printf(" ");
}
