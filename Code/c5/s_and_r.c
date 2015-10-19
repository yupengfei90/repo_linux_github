/* s_and_r.c -- file for rand1() and srand1() */
static unsigned long int next = 1;	// the seed

int rand1(void)
{
	next = next * 1103515245 + 12345;
	return (next/65536) % 32768;
}

void srand1(unsigned int seed)
{
	next = seed;
}
