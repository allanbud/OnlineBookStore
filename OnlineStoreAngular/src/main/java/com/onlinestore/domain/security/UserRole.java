package com.onlinestore.domain.security;
import com.onlinestore.domain.User;
import javax.persistence.*;
import java.io.Serializable;

//@Entity comes from JPA and gonna persist this class into DB as a table
@Entity
//give own name of the table of this class, otherwise javax.persistence generates its own table name
@Table(name="user_role")

//Error: org.springframework.data.redis.serializer.SerializationException: Cannot serialize; nested exception is org.springframework.core.serializer.support.SerializationFailedException: Failed to serialize object using DefaultSerializer; nested exception is java.io.NotSerializableException: com.onlinestore.domain.security.UserRole
public class UserRole implements Serializable {
    private static final long serialVersionUID = 858494050L;

    @Id//primary key
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userRoleId;

    public UserRole () {}//default empty constructor

    //DONE create class User
    public UserRole (User user, Role role) {
        this.user = user;
        this.role = role;
    }
    /**https://app.diagrams.net/#G1Eb_mPG24lnWh58-uXw0SynsVLG-7to7v
     //one role can have many users and user may have multiple roles (admin, user etc)


                   !----------!
     many to 1     !user role !   many to 1
     !--->         !----------!  <----!
     !                                !
     !------!                         !------!
     ! role !  <--many to many-->     ! user !
     !------!                         !------!

     EAGER or LAZY?
     @ManyToOne(fetch = FetchType.EAGER)
     @JoinColumn(name = "user_id")
     private User user;

     any role and any user connect to one UserRole
     */
    @Transient
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

//any role and any user connect to one UserRole
    @Transient
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
