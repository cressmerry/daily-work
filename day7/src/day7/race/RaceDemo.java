package day7.race;

public class RaceDemo {

	public static void main(String[] args) throws InterruptedException {
		Counter counter = new Counter();
		Thread w1 = new Worker("w1", counter);
		Thread w2 = new Worker("w2", counter);
		w1.start();
		w1.join();
		w2.start();
		w2.join();
		System.out.println("Final count: " + counter.count);
	}

}
