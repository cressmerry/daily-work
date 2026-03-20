package repository;

import model.Account;

public interface AccountRepository {

    Account findById(int accountNumber);

    void save(Account account);
}
