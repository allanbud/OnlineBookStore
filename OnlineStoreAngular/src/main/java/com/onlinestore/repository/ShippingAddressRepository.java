package com.onlinestore.repository;

import com.onlinestore.domain.ShippingAddress;
import org.springframework.data.repository.CrudRepository;

public interface ShippingAddressRepository extends CrudRepository<ShippingAddress, Long> {
	
}
