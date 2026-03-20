package app;

import java.util.Scanner;

import exception.BankingException;
import repository.FileAccountRepository;
import service.BankService;

public class MainApp {

	static Scanner sc = new Scanner(System.in);

	public static void main(String[] args) {

		BankService bank = new BankService(new FileAccountRepository());

		while (true) {
			System.out.println("\n1.Create 2.Deposit 3.Withdraw 4.Check 5.Exit");
			int choice = sc.nextInt();
			int accountNumber;

			try {
				switch (choice) {
				case 1:
					createAccount(bank);
					break;

				case 2:
					accountNumber = getAccountNumber();
					bank.deposit(accountNumber, sc.nextDouble());
					break;

				case 3:
					accountNumber = getAccountNumber();
					bank.withdraw(accountNumber, sc.nextDouble());
					break;

				case 4:
					accountNumber = getAccountNumber();
					System.out.println(bank.getAccount(accountNumber).getBalance());
					break;

				case 5:
					sc.close();
					return;
				}
			} catch (BankingException e) {
				System.out.println("Error: " + e.getMessage());
			}
		}
	}

	private static void createAccount(BankService bank) {
		System.out.print("Account No: ");
		int id = sc.nextInt();
		sc.nextLine();
		System.out.print("Name: ");
		String name = sc.nextLine();
		System.out.print("Balance: ");
		double bal = sc.nextDouble();
		bank.createAccount(id, name, bal);
	}

	public static int getAccountNumber() {
		System.out.print("Account No: ");
		int accountNumber = sc.nextInt();
		return accountNumber;
	}
}
