/* list.h -- header file for a simple list type */
#ifndef LIST_H_
#define LIST_H_
#include <stdbool.h>		// c99 feature

/*program-specific declarations */

#define TSIZE		45	// size of array to hold title
struct film {
	char title[TSIZE];
	int rating;
};

/* general type definitions */

typedef struct film Item;

typedef struct node
{
	Item item;
	struct  node * next;
} Node;

typedef Node * List;

/* function prototypes */

/* operation:		determine if List is empty */
/*					plist points to an initialized lsit */
/* postconditions:	function returns True if list is full */
/*					and return False otherwise */

void InitializeList(List * plist);

bool ListIsEmpty(const List * plist);

bool ListIsFull(const List * plist);

unsigned int ListItemCount(const List * plist);

bool AddItem(Item item, List * plist);

void Traverse(const List * plist, void (* pfun)(Item item));

void EmptyTheList(List * plist);

#endif
