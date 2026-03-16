package com.tek.list;

import java.util.LinkedList;
import java.util.List;

public class LinkedListExample {
	public static void main(String[] args) {
		List<String> cities = createListOfCities();
		defensiveDowncating(cities);
		System.out.println(cities.contains("Delhi"));
		System.out.println(cities.remove("Delhi"));
		System.out.print(cities.set(0, "Chennai"));
		System.out.println(cities);

	}

	private static List<String> createListOfCities() {
		List<String> cities = new LinkedList<>();
		cities.add("Bangalore");
		cities.add("Delhi");
		cities.add("Mumbai");
		return cities;
	}

	private static void defensiveDowncating(List<String> cities) {
		if(cities instanceof LinkedList<String>) {
			LinkedList<String> linkedList = ((LinkedList<String>)cities);
			linkedList.add("Chennai");
		}
	}
}
