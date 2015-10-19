// hotel.h -- constants and declarations for hotel.c
#define QUIT		5
#define HOTEL1		80.00
#define HOTEL2		125.00
#define HOTEL3		155.0
#define HOTEL4		200.0
#define DISCOUNT	0.95
#define STARS "************************************"

// shows list of choice
int menu(void);

// returns number of nights desired
int getnights(void);

// calculates price from rate, nights
// and displays result
void showprice(double rate, int nights);
