package basics;

public class Test {

	int x = 10;
	float interest = 13.1F;

	void display() {
		System.out.println(interest);
	}

	public static void main(String[] args) {
		Test obj = new Test();
		obj.display();
		whileLoop();
	}

	public static void whileLoop() {
		int i = 1;
		while (i >= 5) {
			System.out.println(i);
		}
	}
}
