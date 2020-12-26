package com.onlinestore.domain;


import com.onlinestore.domain.security.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * public interface UserDetails
 * extends Serializable
 * Provides core user information.
 * Implementations are not used directly by Spring Security for security purposes.
 * They simply store user information which is later encapsulated into Authentication objects.
 * This allows non-security related user information (such as email addresses, telephone numbers etc)
 * to be stored in a convenient location.
 *
 * Concrete implementations must take particular care to ensure the non-null contract detailed for
 * each method is enforced. See User for a reference implementation (which you might like to extend or
 * use in your code).
 */

//Error: org.springframework.data.redis.serializer.SerializationException: Cannot serialize; nested exception is org.springframework.core.serializer.support.SerializationFailedException: Failed to serialize object using DefaultSerializer; nested exception is java.io.NotSerializableException: com.onlinestore.domain.security.UserRole

@Entity
public class User implements UserDetails, Serializable {

	private static final long serialVersionUID = 848483930L;


	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
//to get fixed id. Once inserted, it cannot be changed
	@Column(name="Id", nullable=false, updatable = false)
	private Long id;
	
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	
	private String email;
	private String phone;
	private boolean enabled = true;

/**from other side it goes @ManyToOne, so this side goes @OneToMany
@ManyToOne(fetch = FetchType.EAGER)
private Role role;

so this side goes @OneToMany
*/
	//@Transient
	@OneToMany(mappedBy = "user", cascade=CascadeType.ALL, fetch = FetchType.EAGER)
	@JsonIgnore
	private Set<UserRole> userRoles = new HashSet<>();




	@OneToMany(cascade=CascadeType.ALL, mappedBy = "user")
	private List<UserPayment> userPaymentList;

	@OneToMany(cascade=CascadeType.ALL, mappedBy = "user")
	private List<UserShipping> userShippingList;





	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public Set<UserRole> getUserRoles() {
		return userRoles;
	}

	public void setUserRoles(Set<UserRole> userRoles) {
		this.userRoles = userRoles;
	}

	//Payment & Shipping


	public List<UserPayment> getUserPaymentList() {
		return userPaymentList;
	}

	public void setUserPaymentList(List<UserPayment> userPaymentList) {
		this.userPaymentList = userPaymentList;
	}



	public List<UserShipping> getUserShippingList() {
		return userShippingList;
	}

	public void setUserShippingList(List<UserShipping> userShippingList) {
		this.userShippingList = userShippingList;
	}


/////////////////////


	/**
	 * define new authority hashset
	 *
	 * take defined userRoles line58
	 *
	 * userRoles is a Set then take each one of them
	 * tempUserRole as an instance of userRole in the userRole set
	*/
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
//Authority class line 26, takes String as authority which is a roleName .getName()
//authorty with roleName is added to Set and get returned
		Set<GrantedAuthority> authorities = new HashSet<>();
		userRoles.forEach(tempUserRole -> authorities.add(new Authority(tempUserRole.getRole().getName())));

		return authorities;
	}




	//not used
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	
	@Override
	public boolean isEnabled() {
		return enabled;
	}
	
	
	
	
}
