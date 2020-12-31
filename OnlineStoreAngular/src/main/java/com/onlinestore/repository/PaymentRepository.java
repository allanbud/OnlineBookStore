package com.onlinestore.repository;

import com.onlinestore.domain.Payment;
import org.springframework.data.repository.CrudRepository;

public interface PaymentRepository extends CrudRepository<Payment, Long>{

}
