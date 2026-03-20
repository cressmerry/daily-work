package repository;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.Account;

import java.io.File;
import java.io.IOException;

public class FileAccountRepository implements AccountRepository {

    private static final String FILE_NAME = "account.json";
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public Account findById(int accountNumber) {
        try {
            return mapper.readValue(new File(FILE_NAME), Account.class);
        } catch (IOException e) {
            throw new RuntimeException("File read error", e);
        }
    }

    @Override
    public void save(Account account) {
        try {
            mapper.writeValue(new File(FILE_NAME), account);
        } catch (IOException e) {
            throw new RuntimeException("File write error", e);
        }
    }
}
