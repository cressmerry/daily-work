package lmsWithList;

import java.util.ArrayList;
import java.util.List;

class Library {

	List<Book> books = new ArrayList<>();

	void add(String id, String title, float price, String author) {
		Book book = new Book(id, title, price, author);
		books.add(book);
	}

	void add(Book book) {
		books.add(book);
	}

	void reserve(String title) throws Exception {
		if (title == null || "".equals(title.trim())) {
			throw new IllegalArgumentException();
		}

		for (Book book : books) {
			if (book.title.equals(title) && book.getStatus() == STATUS.AVAILABLE) {
				book.setStatus(STATUS.BOOKED);
				System.out.println("Borrowed: " + title);
				return;
			}
		}
		throw new BookNotFoundException("Book is not availaible.");
	}

	List<Book> find(String title) {
		if (title == null || "".equals(title.trim())) {
			throw new IllegalArgumentException();
		}
		List<Book> books = new ArrayList<>();
		for (Book book : books) {
			if (book.title.toLowerCase().contains(title.toLowerCase())) {
				books.add(book);
			}
		}
		return books;
	}

	Book remove(String id) throws Exception {
		if ("".equals(id.trim()) || id == null)
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
		for (Book b : books)
			if (b.getStatus() == STATUS.AVAILABLE)
				System.out.println(b + "\n\n");
		System.out.println("============================================");
	}

	void displayAllBooks() {

		System.out.println("BOOKS AVAILIABLE");
		System.out.println("============================================");
		for (Book b : books)
			System.out.println(b + "\n\n");
		System.out.println("============================================");
	}

}
