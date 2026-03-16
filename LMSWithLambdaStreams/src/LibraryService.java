import java.util.*;

public class LibraryService {

	private List<Book> books = new ArrayList<>();

	public void addBook(Book book) {
		books.add(book);
	}

	public void displayBooks() {
		spacedPrint("+", "", 56, "-");
	spacedPrint("|", "AVAILAIBLE BOOKS" , 56, " ");
	spacedPrint("+", "", 56, "-");
	books.stream().forEach(book -> {
		spacedPrint("|", "", 56, " ");
		spacedPrint("|", "", 56, "-");
		spacedPrint("|", "ID: "+book.getId(), 56, " ");
		spacedPrint("|", "Name: "+book.getTitle(), 56, " ");
		spacedPrint("|", "Author: " + book.getAuthor(), 56, " ");
		spacedPrint("|", "", 56, "-");
		spacedPrint("|", "", 56, " ");

	});
	spacedPrint("+", "", 56, "-");

	}


	public void searchByTitle(String title) {

		books.stream().filter(book -> book.getTitle().toLowerCase().contains(title.toLowerCase()))
				.forEach(System.out::println);
	}

	public void showAvailableBooks() {
		spacedPrint("+", "", 56, "-");
		spacedPrint("|", "AVAILAIBLE BOOKS" , 56, " ");
		spacedPrint("+", "", 56, "-");
		books.stream().filter(book -> book.isAvailable()).forEach(book -> {
			spacedPrint("|", "", 56, " ");
			spacedPrint("|", "", 56, "-");
			spacedPrint("|", "ID: "+book.getId(), 56, " ");
			spacedPrint("|", "Name: "+book.getTitle(), 56, " ");
			spacedPrint("|", "Author: " + book.getAuthor(), 56, " ");
			spacedPrint("|", "", 56, "-");
			spacedPrint("|", "", 56, " ");

		});
		spacedPrint("+", "", 56, "-");
	}

	public void spacedPrint(String bound, String str, int width, String filler) {
		System.out.print(bound + str);
		for(int i = 0; i<(width-str.length());i++)
			System.out.print(filler);
		System.out.println(bound);
	}
	public void borrowBook(int id) {

		books.stream().filter(book -> book.getId() == id).findFirst().ifPresent(book -> book.borrowBook());
	}

	public void sortBooksByTitle() {

		books.stream().sorted((b1, b2) -> b1.getTitle().compareTo(b2.getTitle())).forEach(System.out::println);
	}

	public long countAvailableBooks() {

		return books.stream().filter(Book::isAvailable).count();
	}

	public List<Book> getBooks() {
		return books;
	}

	public void setBooks(List<Book> books) {
		this.books = books;
	}
}
