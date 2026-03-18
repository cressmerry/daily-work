package com.tek.bankapp;

class WithdrawTask implements Runnable {
	private final BankAccount account;
	private final float amount;

	public WithdrawTask(BankAccount account, float amount) {
		this.account = account;
		this.amount = amount;
	}

	@Override
	public void run() {
		String thread = Thread.currentThread().getName();
		System.out.println(thread + " attempting to withdraw ₹" + amount);

		boolean success = account.withdraw(amount);

		if (success) {
			System.out.println(thread + " successfully withdrew ₹" + amount);
		} else {
			System.out.println(thread + " FAILED to withdraw ₹" + amount + " (Insufficient balance)");
		}
	}
}
