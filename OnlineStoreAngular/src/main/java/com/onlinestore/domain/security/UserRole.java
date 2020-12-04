package com.onlinestore.domain.security;

import com.onlinestore.domain.User;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="user_role")
public class UserRole implements Serializable {
//https://stackoverflow.com/questions/285793/what-is-a-serialversionuid-and-why-should-i-use-it
    private static final long serialVersionUID = 890345L;

//primary key
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userRoleId;

//default empty
    public UserRole () {}

//DONE create class User
    public UserRole (User user, Role role) {
        this.user = user;
        this.role = role;
    }
//https://app.diagrams.net/#G1Eb_mPG24lnWh58-uXw0SynsVLG-7to7v
//role can have many users and user many roles
//EAGER or LAZY?
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

//any role and any user connect to one UserRole
@ManyToOne(fetch = FetchType.EAGER)
private Role role;

    public long getUserRoleId() {
        return userRoleId;
    }

    public void setUserRoleId(long userRoleId) {
        this.userRoleId = userRoleId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }


}
