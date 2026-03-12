package com.tek.list;

import java.util.Arrays;
import java.util.List;

public class FrequencyExercise {

	public static void main(String[] args) {
		List<Integer> list = Arrays.asList(1,2,2,3,2,4);
		int target = 2;
		int frequency = 0;
		for (Integer i : list) {
			if(i==target)
				frequency++;
		}
		System.out.println("Frequency of " + target + ": " + frequency);
	}

}
