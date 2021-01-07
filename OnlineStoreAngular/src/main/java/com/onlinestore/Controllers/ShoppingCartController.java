package com.onlinestore.controllers;

import com.onlinestore.domain.CartItem;
import com.onlinestore.domain.Product;
import com.onlinestore.domain.ShoppingCart;
import com.onlinestore.domain.User;
import com.onlinestore.service.CartItemService;
import com.onlinestore.service.ProductService;
import com.onlinestore.service.ShoppingCartService;
import com.onlinestore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class ShoppingCartController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private CartItemService cartItemService;
	
	@Autowired
	private ShoppingCartService shoppingCartService;

	@RequestMapping("/add")
	public ResponseEntity addItem (
			@RequestBody HashMap<String, String> mapper, Principal principal
	){
		String productId = (String) mapper.get("productId");
		String qty = (String) mapper.get("qty");

		User user = userService.findByUsername(principal.getName());
		Product product = productService.findOneProduct(Long.parseLong(productId));

		if(Integer.parseInt(qty) > product.getInStockNumber()) {
			return new ResponseEntity("No Product in Stock!", HttpStatus.BAD_REQUEST);
		}
//qty not int
		CartItem cartItem = cartItemService.addProductToCartItem(product, user, Integer.parseInt(qty));
		System.out.println("Product Added..." + cartItem);
		return new ResponseEntity("Product Added!", HttpStatus.OK);
	}

	@RequestMapping("/getCartItemList")
	public List<CartItem> getCartItemList(Principal principal) {
		User user = userService.findByUsername(principal.getName());
		ShoppingCart shoppingCart = user.getShoppingCart();

		List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);

		shoppingCartService.updateShoppingCart(shoppingCart);
		System.out.println("GetCartItemList" + shoppingCart);
		return cartItemList;
	}

	@RequestMapping("/getShoppingCart")
	public ShoppingCart getShoppingCart(Principal principal) {
		User user = userService.findByUsername(principal.getName());
		ShoppingCart shoppingCart = user.getShoppingCart();

		shoppingCartService.updateShoppingCart(shoppingCart);

		return shoppingCart;
	}

	@RequestMapping("/removeItem")
	public ResponseEntity removeItem(@RequestBody String id) {
		cartItemService.removeCartItem(cartItemService.findById(Long.parseLong(id)));

		return new ResponseEntity("Cart Item Removed!", HttpStatus.OK);
	}


	//DONE Not gonna upadate
	@RequestMapping("/updateCartItem")
	public ResponseEntity updateCartItem(
			@RequestBody HashMap<String, String> mapper
	){
		String cartItemId = mapper.get("cartItemId");
		String qty = mapper.get("qty");

		CartItem cartItem = cartItemService.findById(Long.parseLong(cartItemId));
		cartItem.setQty(Integer.parseInt(qty));

		cartItemService.updateCartItem(cartItem);

		return new ResponseEntity("Cart Item Updated!", HttpStatus.OK);
	}

}
