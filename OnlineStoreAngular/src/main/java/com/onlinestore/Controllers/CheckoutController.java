package com.onlinestore.controllers;



import com.fasterxml.jackson.databind.ObjectMapper;
import com.onlinestore.domain.*;
import com.onlinestore.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("/checkout")
public class CheckoutController {
	private Order order = new Order();
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private CartItemService cartItemService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private ShoppingCartService shoppingCartService;
	
	@Autowired
	private MailContructorService mailConstructor;
	
	@RequestMapping(value = "/checkout", method=RequestMethod.POST)
	public Order checkoutPost(
				@RequestBody HashMap<String, Object> mapper,
				Principal principal
			){
		ObjectMapper om = new ObjectMapper();
		// https://www.baeldung.com/jackson-object-mapper-tutorial

		ShippingAddress shippingAddress = om.convertValue(mapper.get("shippingAddress"), ShippingAddress.class);
		BillingAddress billingAddress = om.convertValue(mapper.get("billingAddress"), BillingAddress.class);
		Payment payment = om.convertValue(mapper.get("payment"), Payment.class);
		String shippingMethod = (String) mapper.get("shippingMethod");
		
		ShoppingCart shoppingCart = userService.findByUsername(principal.getName()).getShoppingCart();
		List<CartItem> cartItemList = cartItemService.findByShoppingCart(shoppingCart);
		User user = userService.findByUsername(principal.getName());
		Order order = orderService.createOrder(shoppingCart, shippingAddress, billingAddress, payment, shippingMethod, user);
		
		mailSender.send(mailConstructor.constructOrderConfirmationEmail(user, order, Locale.ENGLISH));
		
		shoppingCartService.clearShoppingCart(shoppingCart);
		
		LocalDate today = LocalDate.now();
		LocalDate estimatedDeliveryDate;
		if (shippingMethod.equals("teslaShipping")) {
			estimatedDeliveryDate=today.plusDays(5);
		} else {
			estimatedDeliveryDate=today.plusDays(3);
		}
		
		this.order = order;
		
		return order;
		
	}

}
