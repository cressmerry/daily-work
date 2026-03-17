package com.tek.StackExercise;

import java.util.Stack;

public class BalancedParantheses {

	public static void main(String[] args) {
		String expression0 = "(a+b)-(c+d)";
		String expression1 = "[(a+b)-(c+d)";
		String expression2 = "()-(c+d)";

		System.out.println("Parantheses Balanced for " + expression0 + ": " + checkBalancedParantheses(expression0));
		System.out.println("Parantheses Balanced for " + expression1 + ": " + checkBalancedParantheses(expression1));
		System.out.println("Parantheses Balanced for " + expression2 + ": " + checkBalancedParantheses(expression2));

	}

	private static boolean checkBalancedParantheses(String expression) {
		char[] characterArray = expression.toCharArray();
		Stack<Character> stack = new Stack<>();
		for (char character : characterArray) {
			if ("[{(<".indexOf(character) != -1)
				stack.push(character);
			else if ("]})>".indexOf(character) != -1) {
				if (stack.isEmpty())
					return false;
				if (!isMatchingPair(stack.pop(), character))
					return false;
			}
		}
		return stack.isEmpty();
	}

	private static boolean isMatchingPair(char opening, char closing) {
		return (opening == '(' && closing == ')') || (opening == '{' && closing == '}')
				|| (opening == '[' && closing == ']');
	}

}
