package lmsWithList;

class Book {
	String id;
	String title;
	float price;
	String author;

	public Book(String id, String title, float price, String author) {
		this.id = id;
		this.title = title;
		this.price = price;
		this.author = author;
		this.status = STATUS.AVAILABLE;
	}

	private STATUS status;

	public STATUS getStatus() {
		return status;
	}

	public void setStatus(STATUS status) {
		this.status = status;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getAuthor() {
		return author;
	}

	@Override
	public String toString() {
		String result = """
				ID: %s
				Book: %s
				Author: %s
				Price: %.2f
				Status: %s""".formatted(id, title, author, price, status);
		return result;
	}
}
