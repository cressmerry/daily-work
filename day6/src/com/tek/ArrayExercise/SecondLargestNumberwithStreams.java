package com.tek.ArrayExercise;

import java.util.Arrays;

public class SecondLargestNumberwithStreams {
	public static void main(String[] args) {
		secondLargestNumberwithStreams();
	}
	private static void secondLargestNumberwithStreams() {
		int[] array = { 5, 9, 2, 7, 1 };
		System.out.println("Array: " + Arrays.toString(array));
		int secondLargestNumber = Arrays.stream(array).sorted().toArray()[array.length - 2];
		System.out.println(secondLargestNumber);
	}
}

