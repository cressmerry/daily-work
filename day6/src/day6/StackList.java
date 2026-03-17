package day6;

import java.util.LinkedList;
import java.util.List;

public class StackList {
	List<Integer> stack = new LinkedList<>();

	void push(int x) {
		stack.add(x);
	}

	int pop() {
		if (stack.isEmpty()) {
			System.out.println("Stack Underflow");
			return -1;
		}
		int element = stack.get(stack.size()-1);
		stack.remove(stack.size()-1);
		return element;
	}
}
