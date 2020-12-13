package com.onlinestore.service;

import com.onlinestore.domain.Product;
import com.onlinestore.repository.ProductRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    //find all product
    public List<Product> findAll() {
        //casting
        List<Product> productList = (List<Product>) productRepository.findAll();

        //retrieve active products
        List<Product> activeProductList = new ArrayList<>();
        //bypassing inactive products
        for (Product product : productList) {
            if(product.isActive()) {
                activeProductList.add(product);
            }
        }

        return activeProductList;
    }

    public Product findOneProduct(Long id) {
        return productRepository.findOne(id);
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> blurrySearch(String keyword) {
        List<Product> productList = productRepository.findByProductTitleContaining(keyword);

        List<Product> activeProductList = new ArrayList<>();

        for (Product product : productList) {
            if(product.isActive()) {
                activeProductList.add(product);
            }
        }

        return activeProductList;
    }

    public void removeOneProduct(Long id) {
        productRepository.delete(id);
    }


}
