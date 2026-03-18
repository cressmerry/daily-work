package com.tek.bankapp;

import java.util.InputMismatchException;
import java.util.Scanner;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class BankingApp {

	static Scanner sc = new Scanner(System.in);

	public static void main(String[] args) throws InterruptedException, ExecutionException {
		System.out.print("Enter balance: ");
		float initialBalance = sc.nextFloat();
		BankAccount account = new BankAccount(initialBalance);
		ExecutorService executor = Executors.newFixedThreadPool(3);
		while (true) {
			displayMenu();
			int choice = getUserChoice(5);

			switch (choice) {

			case 1:
				System.out.println("Current Balance: ₹" + account.getBalance());
				break;

			case 2:
				handleDeposition(account, executor);
				break;

			case 3:
				handleWithdrawl(account, executor);
				break;

			case 4:
				simulateParellalWithdrawl(initialBalance, account, executor);
				break;

			case 5:
				System.out.println("Shutting down banking system...");
				executor.shutdown();
				sc.close();
				System.exit(0);
				break;

			default:
				System.out.println("Invalid choice! Try again.");
			}

		}
	}

	private static void handleDeposition(BankAccount account, ExecutorService executor)
			throws InterruptedException, ExecutionException {
		System.out.print("Enter amount to deposit: ₹");
		int depositionAmount = sc.nextInt();
		Future<?> futureOfDeposit = executor.submit(new DepositTask(account, depositionAmount));
		futureOfDeposit.get();
	}

	private static void handleWithdrawl(BankAccount account, ExecutorService executor)
			throws InterruptedException, ExecutionException {
		System.out.print("Enter amount to withdraw: ₹");
		float withdrawlAmount = sc.nextFloat();
		Future<?> futureOfWithdraw = executor.submit(new WithdrawTask(account, withdrawlAmount));
		futureOfWithdraw.get();
	}

	private static void simulateParellalWithdrawl(float initialBalance, BankAccount account, ExecutorService executor)
			throws InterruptedException, ExecutionException {
		System.out.println("Simulating two parallel withdrawals of ₹" + (initialBalance / 2));

		Future<?> futureOfWithdraw0 = executor.submit(new WithdrawTask(account, initialBalance / 2));
		Future<?> futureOfWithdraw1 = executor.submit(new WithdrawTask(account, initialBalance / 2));
		futureOfWithdraw0.get();
		futureOfWithdraw1.get();
	}

	private static void displayMenu() {
		System.out.println("\n===== MULTITHREADED BANKING SYSTEM (ExecutorService) =====");
		System.out.println("1. Check Balance");
		System.out.println("2. Deposit Money");
		System.out.println("3. Withdraw Money");
		System.out.println("4. Simulate Parallel Withdrawals");
		System.out.println("5. Exit");

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
