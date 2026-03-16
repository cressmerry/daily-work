package com.tek.list;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

public class CommonElmentsExercise {
	public static void main(String[] args) {
		List<Integer> list1 = Arrays.asList(1,2,3,4);
		List<Integer> list2 = Arrays.asList(3, 4, 5, 6);
		Set<Integer> set = new HashSet<>();
		List<Integer> common = new ArrayList<>();
		for(Integer i : list1) {
			set.add(i);
		}
		for(Integer i : list2) {
			if(set.contains(i)) {
				common.add(i);
			}
		}
		System.out.println("Common Elements: " + common);
	}
}
