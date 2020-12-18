package com.onlinestore.repository;

import com.onlinestore.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

//find by this. return list of users
public interface UserRepository extends CrudRepository<User, Long> //Long(class) is a primary key (id in User class) type
{
//Spring should understand findBy and Username as a part of findByUsername and do search automatically
//username in User class
	User findByUsername(String username);
	User findByEmail(String email);
	List<User> findAll();
}
