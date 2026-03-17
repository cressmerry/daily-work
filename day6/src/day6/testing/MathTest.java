package day6.testing;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class MathTest {
	Math math;

	@BeforeEach
	void setup() {
		math = new Math();
	}

	@Test
	void testAdd() {
		int result = math.add(2, 5);
		assertEquals(7, result);
	}

	@Test
	void testAddNegativeNumbers() {
		int result = math.add(-2, -5);
		assertEquals(-7, result);
	}

	@Test
	void testAddNegativeAndPositiveNumbers() {
		int result = math.add(2, -5);
		assertEquals(-3, result);
	}

	@Test
	void testAddWithArray() {
		int result = math.addWithArray(new int[] { 1, 2, 3, 4, 5 });
		assertEquals(15, result);
	}

	@Test
	void testDivideWithZero() {
		assertThrows(ArithmeticException.class, () -> math.divide(5, 0));
	}

}
