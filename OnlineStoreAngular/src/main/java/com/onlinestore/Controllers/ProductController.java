package com.onlinestore.Controllers;

import com.onlinestore.domain.Product;
import com.onlinestore.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

    @RestController
    @RequestMapping("/product")
    public class ProductController {

        @Autowired
        private ProductService productService;

        @RequestMapping (value="/add", method = RequestMethod.POST)
        public Product addProductPost(@RequestBody Product product) {
            return productService.saveProduct(product);
        }
    }
