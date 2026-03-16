package com.tek.fi;

import java.util.function.Predicate;

public class PredicateExample {

	public static void main(String[] args) {
		Predicate<Integer> isEven = ((Integer n) -> {
			return (n % 2 == 0);
		});
		System.out.println(isEven.test(23));

	}

}
