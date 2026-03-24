package banking;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import exception.BankingException;
import model.Account;

public class AccountTest {
	Account account;

	@BeforeEach
	void setup() {
		account = new Account(1234, "John Doe", 1000.0);
	}

	@Test
	void testDepositionWithNegativeOrZeroValue() {
		assertThrows(BankingException.class, () -> account.deposit(-10));
		assertThrows(BankingException.class, () -> account.deposit(0));
	}

	@Test
	void testWithdrawWithNegativeOrZeroValue() {
		assertThrows(BankingException.class, () -> account.withdraw(-10));
		assertThrows(BankingException.class, () -> account.withdraw(0));
	}

	@Test
	void testAccountCreationWithNullName() {
		assertThrows(BankingException.class, () -> {
			Account account = new Account(1234, null, 12345.0);
		});
	}

	@Test
	void testAccountCreationWithNegativeId() {
		assertThrows(BankingException.class, () -> {
			Account account = new Account(-1234, "John Doe", 12345.0);
		});
	}

	@Test
	void testAccountCreationWithNegativeBalance() {
		assertThrows(BankingException.class, () -> {
			Account account = new Account(1234, "John Doe", -12345.0);
		});
	}

}
