package com.tek.fi;

@FunctionalInterface
interface Animal{
	void eat();
}

class Cat implements Animal{
	@Override
	public void eat() {
		System.out.println("Animal Eats Inside Class");

	}
}

public class FunctionalInterfaceDemo {

	public static void main(String[] args) {
		functional();
		oopWay();
	}

	private static void oopWay() {
		Animal cat = new Cat();
		cat.eat();
	}

	private static void functional() {
		Animal animal = ()->{
			System.out.println("Animal Eats In Lambda");
		};
		animal.eat();
	}

}
