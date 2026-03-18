package day7.basics;
class MyThread0 extends Thread {
	@Override
    public void run() {
		try {
			sleep(2000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
        System.out.println("Worker thread running");
    }
}

public class ThreadExample0 {
    public static void main(String[] args) {
        Thread t = new MyThread0();
        t.start();
    }
}
