package com.onlinestore.service;

import com.onlinestore.domain.User;
import com.onlinestore.domain.security.UserRole;
import com.onlinestore.repository.RoleRepository;
import com.onlinestore.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
public class UserServiceImpl implements UserService{
	
	private static final Logger LOG = LoggerFactory.getLogger(UserService.class);



	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;


/**send data as a one packege. Transactual send data when all is ready and commited
in case of error (system ot connection down) data sending will be rolled back and started over again


	https://dzone.com/articles/how-does-spring-transactional
*/
	@Transactional
	public User createUser(User user, Set<UserRole> userRoles) {
//find the corresponding user
		User localUser = userRepository.findByUsername(user.getUsername());
		
		if(localUser != null) {
			LOG.info("User with username {} already exist.", user.getUsername());
		} else {
//if there is no user go through all the roles and save to the DB
			for (UserRole ur : userRoles) {
				roleRepository.save(ur.getRole());
			}
//add all user roles to user
			user.getUserRoles().addAll(userRoles);
			
			localUser = userRepository.save(user);
		}
		
		return localUser;
	}

	@Override
	public User save(User user)  {
		return userRepository.save(user);
	}

	@Override
	public User findById(Long id) {
		return userRepository.findOne(id);
	}

	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}

}
