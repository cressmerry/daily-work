package basics;

import java.util.ArrayList;
import java.util.List;

public class ListDemo {
	public static void main(String args[]) {
		manageBooks();
		stringSurprise();
	}

	private static void stringSurprise() {
		// TODO Auto-generated method stub
		String s1 = new String("Book 1");
		String s2 = new String("Book 1");
		String s3 = new String("Book 1");
		System.out.println(s1 == s2);
	}

	private static void manageBooks() {
		List <String> list= new ArrayList<>();
		list.add("Book1");
		list.add("Book2");
		list.add("Book3");
		System.out.println(list.size());
		list.remove(1);
		System.out.println("After removal "+ list.size());
		list.forEach((book)->System.out.println(book));
	}
}
