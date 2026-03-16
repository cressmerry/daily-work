import java.util.*;

public class LMSApplication {

	private static Scanner sc = new Scanner(System.in);

	public static void main(String[] args) {

		LibraryService library = new LibraryService();

		library.setBooks(FileService.loadBooks());

		while (true) {
			displayBanner();
			int choice = getUserChoice(7);
			sc.nextLine();

			switch (choice) {

			case 1:

				handleAddition(sc, library);

				break;

			case 2:
				clearConsole();
				library.displayBooks();
				break;

			case 3:

				System.out.print("Enter title: ");
				String search = sc.nextLine();

				library.searchByTitle(search);
				break;

			case 4:

				System.out.print("Book ID: ");
				int bookId = sc.nextInt();

				library.borrowBook(bookId);
				break;

			case 5:
				clearConsole();
				library.showAvailableBooks();
				break;

			case 6:

				library.sortBooksByTitle();
				break;

			case 7:

				FileService.saveBooks(library.getBooks());

				System.out.println("Saved to file.");
				sc.close();
				System.exit(0);

			}
			System.out.println("Press Enter To Continue...");
			sc.nextLine();
			clearConsole();
		}
	}

	static void displayBanner() {
		String banner = "  _      __  __  _____ \r\n" + " | |    |  \\/  |/ ____|\r\n" + " | |    | \\  / | (___  \r\n"
				+ " | |    | |\\/| |\\___ \\ \r\n" + " | |____| |  | |____) |\r\n" + " |______|_|  |_|_____/ \r\n"
				+ "                       \r\n" + "                       ";

		System.out.println(banner);
		System.out.println("+------------------------------+");
		System.out.println("|Options:                      |");
		System.out.println("+------------------------------+");
		System.out.println("|---> 1. Add Book              |");
		System.out.println("|---> 2. Display Books         |");
		System.out.println("|---> 3. Search Book           |");
		System.out.println("|---> 4. Borrow Book           |");
		System.out.println("|---> 5. Show Available Books  |");
		System.out.println("|---> 6. Sort Books            |");
		System.out.println("|---> 7. Exit                  |");
		System.out.println("+------------------------------+");
	}

	public static void clearConsole() {
		for (int i = 0; i < 50; i++) {
			System.out.println();
		}
	}

	private static void handleAddition(Scanner sc, LibraryService library) {
		System.out.print("ID: ");
		int id = sc.nextInt();
		sc.nextLine();

		System.out.print("Title: ");
		String title = sc.nextLine();

		System.out.print("Author: ");
		String author = sc.nextLine();

		library.addBook(new Book(id, title, author, true));
	}

	private static int getUserChoice(int range) {
		while (true) {
			try {
				System.out.print("\nEnter choice: ");
				int choice = sc.nextInt();
				if (choice < 1 || choice > range) {
					throw new InputMismatchException("Choice must be between 1 and " + range + ".");
				}
				return choice;
			} catch (InputMismatchException e) {
				System.out.println("Invalid input. Please enter a number between 1 and " + range + ".");
				sc.nextLine();
			}
		}
	}
}
