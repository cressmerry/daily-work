package lms;

import java.util.ArrayList;
import java.util.List;

class Library {

	List<Book> books = new ArrayList<>();

	void addBook(String title, float price) {
		try {
			books.add(new Book(title, price));
		} catch (IllegalArgumentException iex) {
			System.out.println(iex);
		}
	}

	void borrowBook(String title) throws Exception {
		for (Book b : books) {
			if (b.title.equals(title)) {
				if (b.status == STATUS.AVAILAIBLE) {
					b.status = STATUS.BOOKED;
					System.out.println("Borrowed: " + title);
					return;
				}
				else if(b.status==STATUS.DAMAGED) {
					throw new Exception(title + " is damaged");
				}
			}
		}
		throw new Exception(title + " not found.");
	}

	List<Book> find(String title) {
		List<Book> result = new ArrayList<>();
		for (Book book : books) {
			if (book.title.toLowerCase().contains(title.toLowerCase()))
				result.add(book);
		}
		return result;
	}

	void displayBooks() {
		for (Book b : books)
			if (b.status == STATUS.AVAILAIBLE)
				System.out.println(b.title);
	}
}
