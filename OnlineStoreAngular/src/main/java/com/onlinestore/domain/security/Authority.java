package com.onlinestore.domain.security;

import com.onlinestore.serviceInterfaceImpl.ProductServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;

/**
Think of a GrantedAuthority as being a "permission" or a "right". Those "permissions" are (normally)
 expressed as strings (with the getAuthority() method). Those strings let you identify the permissions
 and let your voters decide if they grant access to something.

You can grant different GrantedAuthoritys (permissions) to users by putting them into
 the security context. You normally do that by implementing your own UserDetailsService that returns
 a UserDetails implementation that returns the needed GrantedAuthorities.
 */

/**
 * Serializable classes are useful when you want to persist instances of them or send them over a wire.
 *
 * Instances of Serializable classes can be easily transmitted. Serialization does have some security
 * consequences, however. Read Joshua Bloch's Effective Java.
 */

//Error: org.springframework.data.redis.serializer.SerializationException: Cannot serialize; nested exception is org.springframework.core.serializer.support.SerializationFailedException: Failed to serialize object using DefaultSerializer; nested exception is java.io.NotSerializableException: com.onlinestore.domain.security.UserRole

public class Authority implements GrantedAuthority, Serializable {
    private static final long serialVersionUID = 12343445123L;

    public final String authority;

    public Authority(String authority) {
        this.authority = authority;
    }


    @Override
    public String getAuthority() {
        return authority;
    }

}
