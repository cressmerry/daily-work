package lmsWithList;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;

class LibraryTest {
	Library library;

	@BeforeEach
	void setup() {
		library = new Library();
	}

	// Test for reserve method

	@Test
	void testReserveWhenNotAvailaibleOrDamaged() {
		assertThrows(BookNotFoundException.class, () -> library.reserve("Learn Java"));
	}

	@Test
	void testSuccessfulReservation() {
		Book book = new Book("1", "Learn Java", 100.0F, "John Doe");
		library.add(book);
		try {
			library.reserve("Learn Java");
		} catch (Exception e) {
			e.printStackTrace();
		}
		assertEquals(STATUS.BOOKED, book.getStatus());
	}

	@Test
	void testReserveWhenAlreadyReserved() {
		library.add("1234", "Learn Go", 399.95F, "John Doe");
		try {
			library.reserve("Learn Go");
		} catch (Exception e) {
			e.printStackTrace();
		}
		assertThrows(BookNotFoundException.class, () -> library.reserve("Learn Go"));
	}

	@Test
	void testReserveWithEmptyString() {
		library.add("1234", "Learn Go", 399.95F, "John Doe");
		assertThrows(IllegalArgumentException.class, () -> library.reserve(""));
	}

	@Test
	void testReserveWithStringOfBlankSpaces() {
		library.add("1234", "Learn Go", 399.95F, "John Doe");
		assertThrows(IllegalArgumentException.class, () -> library.reserve("     "));
	}

	@Test
	void testReserveWithNullTitle() {
		library.add("1234", "Learn Go", 399.95F, "John Doe");
		assertThrows(IllegalArgumentException.class, () -> library.reserve(null));
	}

	@Test
	void testReserveWhenNotInList() {
		library.add("1234", "Learn Go", 399.95F, "John Doe");
		assertThrows(BookNotFoundException.class, () -> library.reserve("Learn Java"));
	}

	// Tests for remove method

	@Test
	void testRemoveForNullId() {
		assertThrows(IllegalArgumentException.class, () -> library.remove(null));
	}

	@Test
	void testRemoveForEmptyStringId() {
		assertThrows(IllegalArgumentException.class, () -> library.remove(""));
	}

	@Test
	void testRemoveForOnlyBlankSpace() {
		assertThrows(IllegalArgumentException.class, () -> library.remove("     "));
	}

	@Test
	void testSuccessfulRemoval() {
		library.add("1234", "Learn Go", 399.95F, "John Doe");
		Book book;
		try {
			book = library.remove("1234");
			assertEquals(book.getId(), "1234");
			assertEquals(book.getAuthor(), "John Doe");
			assertEquals(book.getTitle(), "Learn Go");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Test
	void testRemoveForUnavailaibleBook() {
		library.add("2345", "Learn Java", 399.95F, "Jane Doe");
		assertThrows(BookNotFoundException.class, () -> library.remove("1234"));

	}

	// Tests for find method

	void testFindForNullTitle() {
		assertThrows(IllegalArgumentException.class, () -> library.find(null));
	}

	@Test
	void testFindForEmptyStringTitle() {
		assertThrows(IllegalArgumentException.class, () -> library.find(""));
	}

	@Test
	void testFindForOnlyBlankSpaceTitle() {
		assertThrows(IllegalArgumentException.class, () -> library.find("     "));
	}

	@Test
	void testSuccessfulFind() {
		Book book0 = new Book("1", "Learn Java", 100.0F, "John Doe");
		Book book1 = new Book("2", "Learn Go", 100.0F, "Jane Doe");
		library.add(book0);
		library.add(book1);
		List<Book> bookList = library.find("Learn");
		assertTrue(bookList.contains(book0));
		assertTrue(bookList.contains(book1));
	}

	@Test
	void testFindForEmptyOutput() {
		Book book0 = new Book("1", "Learn Java", 100.0F, "John Doe");
		Book book1 = new Book("2", "Learn Go", 100.0F, "Jane Doe");
		library.add(book0);
		library.add(book1);
		List<Book> bookList = library.find("hello");
		assertTrue(bookList.isEmpty());
	}

	@Test
	void testFindForEmptyLibrary() {
		List<Book> bookList = library.find("hello");
		assertTrue(bookList.isEmpty());
	}

	// Tests for add method

	@Test
	void testSuccessfullAdditionOfBookBject() {
		Book book0 = new Book("1234", "Learn Java", 1234.0F, "John Doe");
		library.add(book0);
		library.add("1234", "Learn Go", 1234.0F, "Jane Doe");
		assertTrue(library.find("Learn Java").contains(book0));
	}

	@Test
	void testSuccessfullAdditionOfBookByDetails() {
		library.add("1234", "Learn Go", 1234.0F, "Jane Doe");
		assertTrue(() -> {
			return library.find("Learn Go").get(0).getTitle().equals("Learn Go");
		});
	}

	@Test
	void testAddWithBlankSpaceId() {
		assertThrows(IllegalArgumentException.class, () -> library.add("    ", "Learn Go", 1234.0F, "Jane Doe"));
		assertThrows(IllegalArgumentException.class,
				() -> library.add(new Book("   ", "Learn Go", 1234.0F, "Jane Doe")));
	}

	@Test
	void testAddWithBlankSpaceTitle() {
		assertThrows(IllegalArgumentException.class, () -> library.add("1234", "    ", 1234.0F, "Jane Doe"));
		assertThrows(IllegalArgumentException.class, () -> library.add(new Book("1234", "   ", 1234.0F, "Jane Doe")));
	}

	@Test
	void testAddWithBlankSpaceAuthor() {
		assertThrows(IllegalArgumentException.class, () -> library.add("1234", "Learn Java", 1234.0F, "   "));
		assertThrows(IllegalArgumentException.class, () -> library.add(new Book("1234", "Learn Java", 1234.0F, "    ")));
	}

	@Test
	void testAddWithEmptyStringId() {
		assertThrows(IllegalArgumentException.class, () -> library.add("", "Learn Go", 1234.0F, "Jane Doe"));
		assertThrows(IllegalArgumentException.class,
				() -> library.add(new Book("", "Learn Go", 1234.0F, "Jane Doe")));
	}

	@Test
	void testAddWithEmptyStringTitle() {
		assertThrows(IllegalArgumentException.class, () -> library.add("1234", "", 1234.0F, "Jane Doe"));
		assertThrows(IllegalArgumentException.class, () -> library.add(new Book("1234", "", 1234.0F, "Jane Doe")));
	}

	@Test
	void testAddWithEmptyStringAuthor() {
		assertThrows(IllegalArgumentException.class, () -> library.add("1234", "Learn Java", 1234.0F, ""));
		assertThrows(IllegalArgumentException.class, () -> library.add(new Book("1234", "Learn Java", 1234.0F, "")));
	}
	

	@Test
	void testAddWithNullId() {
		assertThrows(IllegalArgumentException.class, () -> library.add(null, "Learn Go", 1234.0F, "Jane Doe"));
		assertThrows(IllegalArgumentException.class, () -> library.add(new Book(null, "Learn Go", 1234.0F, "Jane Doe")));
	}
	
	@Test 
	void testAddWithNullTitle() {
		assertThrows(IllegalArgumentException.class, () -> library.add("1234", null, 1234.0F, "Jane Doe"));
		assertThrows(IllegalArgumentException.class, () -> library.add(new Book("1234", null, 1234.0F, "Jane Doe")));
	}
	
	@Test 
	void testAddWithNullAuthor() {
		assertThrows(IllegalArgumentException.class, () -> library.add("1234", "Learn Java", 1234.0F, null));
		assertThrows(IllegalArgumentException.class, () -> library.add(new Book("1234", "Learn Java", 1234.0F, null)));
	}

	@Test
	void testAddWithNegativePrice() {
		assertThrows(IllegalArgumentException.class, () -> library.add("1234", "Learn Java", -1234.0F, "John Doe"));
		assertThrows(IllegalArgumentException.class, () -> library.add(new Book("1234", "Learn Java", -1234.0F, "John Doe")));
	}
	
	//Test displayAllBooks method
	
	@Test
	void testDisplayAllBooks() {
		    final ByteArrayOutputStream outputStreamCaptor = new ByteArrayOutputStream();
		System.setOut(new PrintStream(outputStreamCaptor));
		Book book = new Book("1234", "Learn Java", 1234.0F, "John Doe");
		library.add(book);
		try {
			library.reserve("Learn Java");
		} catch (Exception e) {
			e.printStackTrace();
		}
		library.displayAllBooks();
		assertTrue(outputStreamCaptor.toString().trim().contains(book.toString()));
		System.setOut(System.out);
	}

	@Test
	void testDisplayBooks() {
		    final ByteArrayOutputStream outputStreamCaptor = new ByteArrayOutputStream();
		System.setOut(new PrintStream(outputStreamCaptor));
		Book book = new Book("1234", "Learn Java", 1234.0F, "John Doe");
		library.add(book);
		library.displayBooks();
		assertTrue(outputStreamCaptor.toString().trim().contains(book.toString()));
		System.setOut(System.out);
	}

	
}
