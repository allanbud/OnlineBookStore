package com.onlinestore.service;

import com.onlinestore.domain.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAll();

    Product findOneProduct(Long id);

    Product saveProduct(Product product);

    List<Product> blurrySearch(String productTitle);

    void removeOneProduct(Long id);
}
