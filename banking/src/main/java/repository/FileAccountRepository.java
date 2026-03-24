package repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import exception.BankingException;
import model.Account;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class FileAccountRepository implements AccountRepository {

	private static final String FILE_NAME = "account.json";
	private final ObjectMapper mapper = new ObjectMapper();

	@Override
	public Account findById(int accountNumber) {
		try {
			List<Account> accounts = mapper.readValue(new File(FILE_NAME), new TypeReference<List<Account>>() {
			});
			for (Account account : accounts) {
				if (account.getAccountNumber() == accountNumber) {
					return account;
				}
			}
		} catch (IOException e) {
		}
		throw new BankingException("No account by the id " + accountNumber + " was found");
	}

	@Override
	public void save(Account account) {
		File file = new File(FILE_NAME);
		try {
			List<Account> accounts = file.exists() ? mapper.readValue(file, new TypeReference<List<Account>>() {
			}) : new ArrayList<>();
			accounts.removeIf(a -> a.getAccountNumber() == account.getAccountNumber());
			accounts.add(account);
			mapper.writeValue(file, accounts);
		} catch (IOException e) {
		}
	}

}
