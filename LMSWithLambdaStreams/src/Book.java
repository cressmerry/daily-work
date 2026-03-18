public class Book {

	private int id;
	private String title;
	private String author;
	private STATUS status;

	public Book(int id, String title, String author, STATUS status) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.status = status;
	}

	public int getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getAuthor() {
		return author;
	}

	public STATUS getStatus() {
		return status;
	}

	public boolean isAvailable() {
		return STATUS.AVAILABLE==status;
	}
	public void borrowBook() {
		status = STATUS.BOOKED;
	}

	public void returnBook() {
		status = STATUS.AVAILABLE;
	}

	@Override
	public String toString() {
		return id + "," + title + "," + author + "," + status;
	}

}
