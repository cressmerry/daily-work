package lmsWithList;

import java.util.ArrayList;
import static lmsWithList.ValidationUtils.*;
import java.util.List;

class Library {

	private List<Book> books = new ArrayList<>();

	void add(String id, String title, float price, String author) {
		Book book = new Book(id, title, price, author);
		books.add(book);
	}

	void add(Book book) {
		books.add(book);

	}

	void reserve(String title) throws Exception {
		if (!validateStringValue(title)) {
			throw new IllegalArgumentException();
		}

		for (Book book : books) {
			if (book.getTitle().equals(title) && book.getStatus() == STATUS.AVAILABLE) {
				book.setStatus(STATUS.BOOKED);
				System.out.println("Borrowed: " + title);
				return;
			}
		}
		throw new BookNotFoundException("Book is not availaible.");
	}

	List<Book> find(String title) {
		if (!validateStringValue(title)) {
			throw new IllegalArgumentException();
		}
		List<Book> bookFindings = new ArrayList<>();
		for (Book book : books) {
			if (book.getTitle().toLowerCase().contains(title.toLowerCase())) {
				bookFindings.add(book);
			}
		}
		return bookFindings;
	}

	Book remove(String id) throws Exception {
		if (!validateStringValue(id))
			throw new IllegalArgumentException();
		for (Book book : books) {
			if (book.getId().toLowerCase().equals(id.toLowerCase())) {
				books.remove(book);
				return book;
			}
		}
		throw new BookNotFoundException("No book was availaible for the id: " + id);
	}

	void displayBooks() {
		System.out.println("BOOKS AVAILIABLE");
		System.out.println("============================================");
		for (Book book : books)
			if (book.getStatus() == STATUS.AVAILABLE)
				System.out.println(book + "\n\n");
		System.out.println("============================================");
	}

	void displayAllBooks() {

		System.out.println("BOOKS AVAILIABLE");
		System.out.println("============================================");
		for (Book book : books)
			System.out.println(book + "\n\n");
		System.out.println("============================================");
	}

}
