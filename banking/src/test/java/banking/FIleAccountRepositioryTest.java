package banking;

import static org.junit.jupiter.api.Assertions.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.databind.ObjectMapper;

import exception.BankingException;
import model.Account;
import repository.FileAccountRepository;

class FIleAccountRepositioryTest {

	private FileAccountRepository repository;
	private File testFile;
	Account account;

	@BeforeEach
	void setUp() throws Exception {
		testFile = Files.createTempFile("account", ".json").toFile();
		File accountJson = new File(testFile.getParent(), "account.json");
		if (accountJson.exists())
			accountJson.delete();
		testFile.renameTo(accountJson);
		repository = new FileAccountRepository();
		account = new Account(1234, "John Doe", 12345);
	}

	@AfterEach
	void tearDown() {
		File file = new File("account.json");
		if (file.exists())
			file.delete();
	}

	@Test
	void testSuccessfullSave() {
		File file = new File("account.json");
		ObjectMapper mapper = new ObjectMapper();
		try {
			repository.save(account);
			Account retreivedAccount = mapper.readValue(file, Account.class);
			assertEquals(retreivedAccount.getAccountNumber(), account.getAccountNumber());
			assertEquals(retreivedAccount.getBalance(), account.getBalance());
			assertEquals(retreivedAccount.getHolderName(), account.getHolderName());
		} catch (IOException e) {
		}

	}

	@Test
	void testSuccessfullFindById() {
		repository.save(account);
		Account retreivedAccount = repository.findById(1234);
		assertEquals(retreivedAccount.getAccountNumber(), account.getAccountNumber());
		assertEquals(retreivedAccount.getBalance(), account.getBalance());
		assertEquals(retreivedAccount.getHolderName(), account.getHolderName());
	}

	@Test
	void testUnsuccessfullFindById() {
		repository.save(account);
		assertThrows(BankingException.class, () -> repository.findById(1233));
	}

}
