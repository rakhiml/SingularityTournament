package kz.hackaton.tournament.exceptions;

public class AccountNotFound extends RuntimeException{
    public AccountNotFound(String message) {
        super(message);
    }
}
