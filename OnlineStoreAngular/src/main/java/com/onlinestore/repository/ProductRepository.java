package com.onlinestore.repository;

import com.onlinestore.domain.Product;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
//id type Long
public interface ProductRepository extends CrudRepository<Product, Long> {
    //find By ProductTitle Containing keyword
    List<Product> findByProductTitleContaining(String keyword);
}
