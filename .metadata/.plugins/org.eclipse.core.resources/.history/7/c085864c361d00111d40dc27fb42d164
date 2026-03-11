import java.util.ArrayList;
import java.util.List;

class Library {

	List<Book> books = new ArrayList<>();

	void addBook(String title) {
		Book book = new Book(title, STATUS.AVAILABLE);
		book.status = STATUS.AVAILABLE;
		books.add(book);
	}

	void borrowBook(String title) {
		for (Book b : books) {
			if (b.title.equals(title) && b.status == STATUS.AVAILABLE) {
				b.status = STATUS.BOOKED;
				System.out.println("Borrowed: " + title);
				return;
			}
		}
		// throw exception for non available book
		// use status in place of availability
		System.out.println("Book not available");
	}
//	List<Book> find(String title){ //partial match

	void displayBooks() {
		for (Book b : books)
			if (b.status == STATUS.AVAILABLE)
				System.out.println(b.title);
	}
}
