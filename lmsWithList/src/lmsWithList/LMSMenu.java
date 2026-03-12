package lmsWithList;

import java.util.Scanner;

public class LMSMenu {
	Library library;
	Scanner sc = new Scanner(System.in);

	LMSMenu(Library library) {
		this.library = library;
	}

	void displayMenu() {
		System.out.println("Library Management System");
		String options = "Options:\n\t1. Add Book\n\t2. Remove Book\n\t3. Reserve Book\n\t4. Display Books\n\t0. Exit";
		System.out.println(options);
	}

	int getChoice() {
		try {
			int choice = sc.nextInt();
			return choice;
		} catch (Exception ex) {
		}
		return -1;
	}

	void start() {
		int choice;
		while (true) {
			displayMenu();
			choice = -1;
			System.out.print("\nEnter choice: ");
			choice = getChoice();
			sc.nextLine();
			try {
				switch (choice) {
				case 1:
					handleAddition();
					break;
				case 2:
					handleRemoval();
					break;
				case 3:
					handleReservation();
					break;
				case 4:
					library.displayBooks();
					break;
				case 0:
					System.out.println("Exiting...");
					sc.close();
					System.exit(0);
					break;
				default:
					System.out.println("Invalid Choice!!!");
				}
			} catch (Exception ex) {
				System.out.println(ex);
			}
		}

	}

	void handleAddition() throws Exception {
		String author, title, id;
		float price;
		System.out.print("Enter book title: ");
		title = sc.nextLine();
		if (title.trim().equals("")) {
			throw new Exception("Invalid Book Name");
		}
		System.out.print("Enter book author: ");
		author = sc.nextLine();
		if (author.trim().equals("")) {
			throw new Exception("Invalid Author Name");
		}
		System.out.print("Enter id: ");
		id = sc.next();
		System.out.print("Enter price: ");
		price = sc.nextFloat();
		library.add(id, title, price, author);
	}

	void handleReservation() {
		System.out.print("Enter book name: ");
		String name = sc.nextLine();

		try {
			library.reserve(name);
		} catch (Exception ex) {
			System.out.println(ex);
		}
	}

	void handleRemoval() {
		System.out.print("Enter id: ");
		String id = sc.next();

		try {
			library.remove(id);
		} catch (Exception ex) {
			System.out.println(ex);
		}
	}
}
