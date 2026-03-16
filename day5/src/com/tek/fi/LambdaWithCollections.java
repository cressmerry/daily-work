package com.tek.fi;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.function.Consumer;

public class LambdaWithCollections {

	public static void main(String[] args) {
		List<String> names = Arrays.asList("Java", "Python", "Go");
		// consumerTest(names);
		comparatorTest();
		comparatorWithAnonymousInnerClassTest();
	}

	private static void comparatorTest() {
		List<String> names = Arrays.asList("Java", "Python", "Go");
		names.sort((str1, str2) -> str1.length() - str2.length());
		System.out.println(names);

	}

	private static void comparatorWithAnonymousInnerClassTest() {
		List<String> names = Arrays.asList("Java", "Python", "Go");
		names.sort(new Comparator<String>() {
			public int compare(String s1, String s2) {
				return s1.length() - s2.length();
			}
		});
		System.out.println(names);

	}

	private static void consumerTest(List<String> names) {
		Consumer<String> consumer = (String name) -> System.out.println(name);
		consumer.accept("Hello World");
		names.forEach(consumer);
	}

}
