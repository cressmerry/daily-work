package service;

import model.Account;
import repository.AccountRepository;

public class BankService {

	private final AccountRepository repository;

	public BankService(AccountRepository repository) {
		this.repository = repository;
	}

	public void deposit(int accountNumber, double amount) {
		Account account = repository.findById(accountNumber);
		account.deposit(amount);
		repository.save(account);
	}

	public void withdraw(int accountNumber, double amount) {
		Account account = repository.findById(accountNumber);
		account.withdraw(amount);
		repository.save(account);
	}
}
