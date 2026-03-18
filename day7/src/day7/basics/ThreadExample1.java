package day7.basics;
class MyTask1 implements Runnable {
    public void run() {
        System.out.println("Task running");
    }
}

public class ThreadExample1 {
    public static void main(String[] args) {
        Thread t = new Thread(new MyTask1());
        t.start();
    }
}
