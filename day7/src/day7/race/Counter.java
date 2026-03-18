package day7.race;

public class Counter {
	int count = 0;

	void increment() {
		count++;
		System.out.println(Thread.currentThread());
	}
}
