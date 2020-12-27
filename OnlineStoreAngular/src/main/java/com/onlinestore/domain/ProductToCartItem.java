package com.onlinestore.domain;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class ProductToCartItem implements Serializable{
	private static final long serialVersionUID = 3463467834L;


	/**


	           !
	           ! Product To CartItem
            -> !--------------------- <-
           !                           !
        1 to M                       1 to M
          !                            !
	 !---------  M to M??? 	!----------!
	 !product	<------>    !CartItem  !
	 !						!          !
     !---------	            !----------!

	 One product can become many CartItems
	 But One CartItem CANNOT point to multiple products
	 One CartItem --> One Product

	**/
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name="product_id")
	private Product product;
	
	@ManyToOne
	@JoinColumn(name="cart_item_id")
	private CartItem cartItem;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public CartItem getCartItem() {
		return cartItem;
	}

	public void setCartItem(CartItem cartItem) {
		this.cartItem = cartItem;
	}
	
	
}
