package lmsWithList;

import static lmsWithList.ValidationUtils.*;

class Book {
	private String id;
	private String title;
	private float price;
	private String author;

	public Book(String id, String title, float price, String author) {
		if (!validateStringValue(title) || !validateStringValue(author) || !validateStringValue(id))
			throw new IllegalArgumentException("Invalid Argument");
		this.id = id;
		this.title = title;
		setPrice(price);
		;
		this.author = author;
		setStatus(STATUS.AVAILABLE);
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
		if(!validateNumericInput(price))
			throw new IllegalArgumentException();
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
