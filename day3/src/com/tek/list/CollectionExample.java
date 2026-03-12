package com.tek.list;

import java.util.ArrayList;

import java.util.List;

public class CollectionExample {
	public static void main(String[] args) {
		List<String> fruits = new ArrayList<>();
		fruits.add("Apple");
		fruits.add("Banana");
		fruits.add("Mango");
		fruits.add("Mango");
		
		System.out.println(fruits);
		System.out.print(fruits.get(2) == fruits.get(3));
	}
}
