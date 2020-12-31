package com.onlinestore.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class BillingAddress implements Serializable{
	private static final long serialVersionUID = 7651615582348L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String billingAddressName;
	private String billingAddressStreet;
	private String billingAddressCity;
	private String billingAddressCountry;
	private String billingAddressZipcode;
	
	@OneToOne
	@JsonIgnore
	private Order order;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getBillingAddressName() {
		return billingAddressName;
	}

	public void setBillingAddressName(String billingAddressName) {
		this.billingAddressName = billingAddressName;
	}

	public String getBillingAddressStreet1() {
		return billingAddressStreet;
	}

	public void setBillingAddressStreet1(String billingAddressStreet) {
		this.billingAddressStreet = billingAddressStreet;
	}


	public String getBillingAddressCity() {
		return billingAddressCity;
	}

	public void setBillingAddressCity(String billingAddressCity) {
		this.billingAddressCity = billingAddressCity;
	}

	public String getBillingAddressCountry() {
		return billingAddressCountry;
	}

	public void setBillingAddressCountry(String billingAddressCountry) {
		this.billingAddressCountry = billingAddressCountry;
	}

	public String getBillingAddressZipcode() {
		return billingAddressZipcode;
	}

	public void setBillingAddressZipcode(String billingAddressZipcode) {
		this.billingAddressZipcode = billingAddressZipcode;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}


	
			
}
