package com.onlinestore.domain.security;

import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;

public class Authority implements GrantedAuthority, Serializable {


//https://stackoverflow.com/questions/285793/what-is-a-serialversionuid-and-why-should-i-use-it
private static final long serialVersionUID = 123123L;

    private final String authority;

    public Authority(String authority) {
        this.authority = authority;
    }

    @Override
    public String getAuthority() {
        return authority;
    }
}