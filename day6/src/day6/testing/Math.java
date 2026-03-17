package day6.testing;

import java.util.Arrays;

public class Math {
	public int add(int a, int b) {
		return a + b;
	}

	public int addWithArray(int[] array) {
		int sum = Arrays.stream(array).reduce(0, (current, element) -> current + element);
		return sum;
	}

	public int divide(int a, int b) {
		return a / b;
	}
}
