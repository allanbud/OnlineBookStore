package com.onlinestore.service;

import com.onlinestore.domain.User;
import com.onlinestore.domain.UserBilling;
import com.onlinestore.domain.UserPayment;
import com.onlinestore.domain.UserShipping;
import com.onlinestore.domain.security.UserRole;

import java.util.Set;

public interface UserService {
	
	User createUser(User user, Set<UserRole> userRoles);

	//store-front:

	User findByUsername(String username);

	User findByEmail (String email);

	User save(User user);

	User findById(Long id);

	//Payment & Shipping

	void updateUserPaymentInfo(UserBilling userBilling, UserPayment userPayment, User user);

	void updateUserBilling(UserBilling userBilling, UserPayment userPayment, User user);

	void setUserDefaultPayment(Long userPaymentId, User user);

	void updateUserShipping(UserShipping userShipping, User user);

	void setUserDefaultShipping(Long userShippingId, User user);


}
