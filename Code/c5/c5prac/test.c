#include <stdio.h>
#include <string.h>

int main(void)
{
	int a = 0b00000100;
	int b = 0b00000001;
	char string[5];

	string[0] = 'h';
	string[1] = 'e';
	string[2] = 'l';
	string[3] = 'l';
	string[4] = '\0';
	
	unsigned char num;

//	num = 257;
//	printf("num = %d\n", num);
//	printf("9 in octal is %#o.\n", 9);
	printf("array string contents %s\n", string);

	return 0;
}
