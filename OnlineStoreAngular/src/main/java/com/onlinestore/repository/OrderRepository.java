package com.onlinestore.repository;

import com.onlinestore.domain.Order;
import com.onlinestore.domain.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepository extends CrudRepository<Order, Long> {
	List<Order> findByUser(User user);
}
