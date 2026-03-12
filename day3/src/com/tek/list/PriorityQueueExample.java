package com.tek.list;

import java.util.PriorityQueue;
import java.util.Queue;

public class PriorityQueueExample {

	public static void main(String[] args) {
		Queue<Integer> pq = new PriorityQueue<>();
		pq.add(40);
		pq.add(10);
		pq.add(30);
		
		System.out.println(pq);
		System.out.println(pq.poll());
	}

}
