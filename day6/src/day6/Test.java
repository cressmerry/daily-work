package day6;

public class Test {

	public static void main(String[] args) {
		stackTest();
		
	}

	private static void stackTest() {
		StackList stack = new StackList();
		stack.push(10);
		stack.pop();
		stack.pop();
	}

}
