package day7.race;

public class Worker extends Thread {
	Counter counter;

	public Worker(String name, Counter counter) {
		super(name);
		this.counter = counter;
	}

	public void run() {
		for (int i = 0; i < 200; i++)
			counter.increment();
	}
}
