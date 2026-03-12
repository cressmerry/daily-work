package lmsWithList;

import java.util.ArrayList;
import java.util.List;

class Library {

	List<Book> books = new ArrayList<>();

	void add(String id, String title, float price, String author) {
		Book book = new Book(id, title, price, author);
		books.add(book);
	}

	void reserve(String title) throws Exception {
		for (Book b : books) {
			if (b.title.equals(title) && b.getStatus() == STATUS.AVAILABLE) {
				b.setStatus(STATUS.BOOKED);
				System.out.println("Borrowed: " + title);
				return;
			}
		}
		throw new Exception("Book is not availaible.");
	}

	List<Book> find(String title) {
		List<Book> books = new ArrayList<>();
		for (Book book : books) {
			if (book.title.toLowerCase().contains(title.toLowerCase())) {
				books.add(book);
			}
		}
		return books;
	}

	Book remove(String id) throws Exception {
		for (Book book : books) {
			if (book.getId().toLowerCase().equals(id.toLowerCase())) {
				books.remove(book);
				return book;
			}
		}
		throw new Exception("No book was availaible for the id: " + id);
	}

	void displayBooks() {
		System.out.println("BOOKS AVAILIABLE");
		System.out.println("============================================");
		for (Book b : books)
			if (b.getStatus() == STATUS.AVAILABLE)
				System.out.println(b + "\n\n");
		System.out.println("============================================");
	}

}
