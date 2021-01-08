package com.onlinestore.serviceInterfaceImpl;

import com.onlinestore.domain.Product;
import com.onlinestore.domain.User;
import com.onlinestore.domain.security.Authority;
import com.onlinestore.domain.security.Role;
import com.onlinestore.domain.security.UserRole;
import com.onlinestore.repository.ProductRepository;
import com.onlinestore.service.ProductService;
import com.onlinestore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private UserService userService;

    @Autowired
    private ProductRepository productRepository;


    //find all product
    public List<Product> findAllProduct() {

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

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        System.out.println("Current user:  " + currentPrincipalName);
//TODO

        User currentUser = userService.findByUsername(currentPrincipalName);
        long currentRole = (((UserRole)currentUser.userRoles.toArray()[0]).userRoleId);

        if (currentRole == 1) {
        return activeProductList;
        } else {
            return productList;
        }
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
