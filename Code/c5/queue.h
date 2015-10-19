/* queue.h -- interface for a queue */
#ifndef _QUEUE_H_
#define _QUEUE_H_
#include <stdbool.h>

typedef struct item
{
	long arrive;		// the time when a customer joins the queue
	int processtime;	// the number of consultation minutes desired
} Item;

#define MAXQUEUE 10

typedef struct node {
	Item item;
	struct node * next;
} Node; 

typedef struct queue
{
	Node * front;	// pointer to front of queue
	Node * rear;	// pointer to rear of queue
	int items;		// number of items in queue
} Queue;

/* operation:	initialize the queue		*/
/* precondition: pq points to a queue		*/
/* postcondition:queue is initialized to being empty */
void InitializeQueue(Queue * pq);

bool QueueIsFull(const Queue * pq);

bool QueueIsEmpty(const Queue * pq);

int QueueItemCount(const Queue * pq);

bool EnQueue(Item item, Queue * pq);

bool DeQueue(Item * pitem, Queue * pq);

void EmptyTheQueue(Queue * pq);

#endif
 

