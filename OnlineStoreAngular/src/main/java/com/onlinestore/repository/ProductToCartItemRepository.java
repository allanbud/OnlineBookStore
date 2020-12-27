package com.onlinestore.repository;

import com.onlinestore.domain.CartItem;
import com.onlinestore.domain.ProductToCartItem;
import org.springframework.data.repository.CrudRepository;

public interface ProductToCartItemRepository extends CrudRepository<ProductToCartItem, Long>{
	void deleteByCartItem(CartItem cartItem);
}
