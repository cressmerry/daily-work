package com.tek.fi;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class SimpleLambda {
	public static void main(String[] args) {
		Stream<Integer> stream = Stream.of(1,2,3);
		stream.forEach(System.out::println);
		stream.forEach(System.out::println);
	}
}
