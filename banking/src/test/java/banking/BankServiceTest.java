package banking;

import model.Account;
import repository.AccountRepository;
import service.BankService;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import exception.BankingException;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class BankServiceTest {

	@Mock
	private AccountRepository repository;

	@InjectMocks
	private BankService bankService;

	private Account account;

	@BeforeEach
	void setup() {
		MockitoAnnotations.openMocks(this);
		account = new Account(1, "Amit", 1000);
	}

	@Test
	void testDeposit() {

		when(repository.findById(1)).thenReturn(account);// mocking

		bankService.deposit(1, 500);

		assertEquals(1500, account.getBalance());

		verify(repository).save(account);
	}

	@Test
	void testWithdrawInsufficientBalance() {

		when(repository.findById(1)).thenReturn(account);

		assertThrows(BankingException.class, () -> bankService.withdraw(1, 2000));

		verify(repository, never()).save(any());
	}

	@Test
	void testSuccessfullWithdraw() {

		when(repository.findById(1)).thenReturn(account);

		bankService.withdraw(1, 500);
		assertEquals(account.getBalance(), 500);
	}
	
	
}
