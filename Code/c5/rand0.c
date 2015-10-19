/* rand0.c -- produces random numbers */
static unsigned long int next = 1;	// the seed

int rand0(void)
{
/* magic formula to generate pseudprandom number */
	next = next * 1103515245 + 12345;
	return (unsigned int) (next / 65536) % 32768;
}
