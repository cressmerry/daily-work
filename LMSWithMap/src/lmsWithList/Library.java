package lmsWithList;

import java.util.HashMap;
import java.util.Map;

class Library {

	Map<String, Book> books = new HashMap<>();

	void add(String id, String title, float price, String author) {
		Book book = new Book(id, title, price, author);
		books.put(id, book);
	}

	void reserve(String title) throws Exception {
		for (Map.Entry<String, Book> entry : books.entrySet()) {
			Book book = entry.getValue();
			if (book.title.equals(title) && book.getStatus() == STATUS.AVAILABLE) {
				book.setStatus(STATUS.BOOKED);
				System.out.println("Borrowed: " + title);
				return;
			}
		}
		throw new Exception("Book is not availaible.");
	}

	Map<String, Book> find(String title) {
		Map<String, Book> result = new HashMap<>();
		for (Map.Entry<String, Book> entry : books.entrySet()) {
			Book book = entry.getValue();
			if (book.title.toLowerCase().contains(title.toLowerCase())) {
				result.put(entry.getKey(), book);
			}
		}
		return result;
	}

	void remove(String id) throws Exception {
		if (books.remove(id) == null)
			throw new Exception("No book was availaible for the id: " + id);
	}

	void displayBooks() {
		System.out.println("BOOKS AVAILIABLE");
		System.out.println("============================================");
		for (Map.Entry<String, Book> entry : books.entrySet()) {
			Book book = entry.getValue();
			System.out.println(book + "\n\n");
		}
		System.out.println("============================================");
	}

}
