package basics;

public class Demo1 {

	public static void main(String[] args) {
//		int age = 19;
//		System.out.println("Age: "+ age);
//		System.out.println("Hello World");
//		System.out.println(isEven(age));
		printPattern(5,'$');
	}
	
	static boolean isEven(int num) {
		return num%2==0;
	}
	
	static void printPattern(int rows, char character) {
		for (int i =0; i< rows;i++) {
			for(int j=0; j<rows-i;j++)
				System.out.print(character);
			System.out.println();
		}
	}
	
}
