package day6;

public class ArrayExample {
	public static void main(String[] args) {
//		basicArray();
//		arrayWithCustomObjects();
	}

	private static void basicArray() {
		int [] numbers = new int[10];
		numbers[1] = 10;
		System.out.print(numbers[2]);
	}


	public static void arrayWithCustomObjects() {
		Book[] books = new Book[10];
		books[0] = new Book(1, "Learn Java", "John Doe", false);
		books[1] = new Book(2, "Learn Python", "Jane Doe", false);
		books[2] = new Book(3, "Learn Go", "Mike Lor", false);
		books[3] = new Book(4, "Learn Ruby", "Jor El", false);
		books[4] = new Book(5, "Learn FORTRAN", "Kal El", false);
		for(Book book : books) {
			System.out.println(book);
		}
	}
}
