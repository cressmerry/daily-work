package lmsWithList;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

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
		assertThrows(BookNotFoundException.class, () -> library.reserve("Learn Java"));
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
	
	
	//Tests for find method
	
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
		List<Book> bookList = library.find("Learn Java");
		assertTrue(bookList.contains(book0));
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

	
	
}
