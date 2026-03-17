package com.tek.StackExercise;

import java.util.Stack;

public class ReverseString {

	public static void main(String[] args) {
		String string = "ABCDEFGH";
		System.out.println(string);
		String reversedString = reverseString(string);
		System.out.println(reversedString);
	}

	private static String reverseString(String string) {
		char[] characterArray = string.toCharArray();
		Stack<Character> stack = new Stack<>();
		String reversedString = "";
		for (char character : characterArray)
			stack.push(character);
		while(!stack.isEmpty())
			reversedString += stack.pop();
		return reversedString;
	}
}
