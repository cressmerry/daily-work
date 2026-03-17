import java.io.*;
import java.util.*;
import java.util.stream.*;

public class FileService {

	private static final String FILE_NAME = "books.csv";

	public static void saveBooks(List<Book> books) {

		try (PrintWriter writer = new PrintWriter(new FileWriter(FILE_NAME))) {

			books.stream().map(Book::toString).forEach(writer::println);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static List<Book> loadBooks() {

		List<Book> books = new ArrayList<>();

		try (BufferedReader reader = new BufferedReader(new FileReader(FILE_NAME))) {

			books = reader.lines().map(line -> line.split(","))
					.map(data -> new Book(Integer.parseInt(data[0]), data[1], data[2], STATUS.valueOf(data[3])))
					.collect(Collectors.toList());

		} catch (Exception e) {
			System.out.println("No file found.");
		}

		return books;
	}
}