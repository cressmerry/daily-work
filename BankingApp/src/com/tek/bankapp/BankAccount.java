package com.tek.bankapp;

class BankAccount {
	private float balance;

	public BankAccount(float balance) {
		this.balance = balance;
	}

	public synchronized float getBalance() {
		return balance;
	}

	public synchronized boolean withdraw(float amount) {
		System.out.println(Thread.currentThread().getName() + " checking balance...");

		if (balance >= amount) {
			balance -= amount;
			return true;
		}
		return false;
	}

	public synchronized void deposit(int amount) {
		try {
			Thread.sleep(300);
		} catch (InterruptedException e) {
		}
		balance += amount;
	}
}
