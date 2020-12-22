package com.onlinestore.service;

import com.onlinestore.domain.User;
import com.onlinestore.domain.security.UserRole;

import java.util.Set;

public interface UserService {
	
	User createUser(User user, Set<UserRole> userRoles);

	//Next for store-front

	User findByUsername(String username);

	User findByEmail (String email);

	User save(User user);

	User findById(Long id);



}
