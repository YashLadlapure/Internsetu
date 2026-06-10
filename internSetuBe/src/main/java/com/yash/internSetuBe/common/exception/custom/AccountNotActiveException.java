package com.yash.internSetuBe.common.exception.custom;

public class AccountNotActiveException extends RuntimeException{
    public AccountNotActiveException() {
        super("Account is not Activated. Please verify your email before logging in.");
    }
}
