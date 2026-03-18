package day7.basics;

public class ThreadExample2 {

	public static void main(String[] args) {
		Thread thread = new MyThread0();
		thread.start();
		Thread task = new Thread(new MyTask1());
		task.start();
	}

}
