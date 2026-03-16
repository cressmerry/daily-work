package com.tek.list;

import java.util.LinkedHashSet;
import java.util.Set;

public class LinkedHashSetExample {
	public static void main(String[] args) {
		Set<String> set = new LinkedHashSet<>();
		set.add("A");
		set.add("B");
		set.add("C");
		System.out.println(set);
	}
}
