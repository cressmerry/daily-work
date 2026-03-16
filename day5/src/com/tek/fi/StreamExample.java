package com.tek.fi;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StreamExample {

	public static void main(String[] args) {
//		stream1();
		streamWithChain();
	}

	public static void streamWithChain() {
		List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
		Stream<Integer> stream = numbers.stream()
											.map(number -> number%2==1 ? number*number : number)
											.filter(number -> number%2==1);
		List<Integer> modifiedList = stream.collect(Collectors.toList());
		modifiedList.forEach(System.out::println);
	}

//	public static void stream1() {
//		List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
//		Stream<Integer> stream = numbers.stream();
//		Stream<Integer> squaredStream = stream.map(number -> number * number);
//		Stream<Integer> filteredStream = squaredStream.filter(number -> number % 2 != 0);
//		List<Integer> filteredList = filteredStream.collect(Collectors.toList());
//		System.out.println(filteredList);
//	}

}
