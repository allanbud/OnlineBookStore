package com.onlinestore.service;

import com.onlinestore.domain.User;
import com.onlinestore.domain.security.UserRole;

import java.util.Set;

public interface UserService {
	
	User createUser(User user, Set<UserRole> userRoles);

}
