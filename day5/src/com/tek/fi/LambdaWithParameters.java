package com.tek.fi;

interface Add{
	int sum(int a, int b);
}


public class LambdaWithParameters {

	public static void main(String[] args) {
		Add add = (a, b)->a+b;
		System.out.print(add.sum(5,3));
	}

}
