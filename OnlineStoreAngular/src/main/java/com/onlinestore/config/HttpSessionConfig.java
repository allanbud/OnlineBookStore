package com.onlinestore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

/*

(1) The @EnableRedisHttpSession annotation creates a Spring Bean with the name of springSessionRepositoryFilter
 that implements Filter.


 The filter is what is in charge of replacing the HttpSession implementation to be
  backed by Spring Session. In this instance Spring Session is backed by Redis.

https://docs.spring.io/spring-session/docs/current/reference/html5/guides/java-redis.html

(2) We create a RedisConnectionFactory that connects Spring Session to the Redis Server.
We configure the connection to connect to localhost on the default port (6379) For more
information on configuring Spring Data Redis, refer to the reference documentation.
https://docs.spring.io/spring-session/docs/current/api/org/springframework/session/data/redis/config/annotation/web/http/EnableRedisHttpSession.html



 Instead of using Tomcat’s HttpSession, we persist the values in Redis. Spring Session
 creates a cookie named SESSION in your browser. That cookie contains the ID of your session.


https://docs.spring.io/spring-session/docs/current/reference/html5/
 */


//DONE org.springframework.data.redis.serializer.SerializationException: Cannot serialize; nested exception is org.springframework.core.serializer.support.SerializationFailedException: Failed to serialize object using DefaultSerializer; nested exception is java.io.NotSerializableException: com.onlinestore.domain.security.UserRole


@EnableRedisHttpSession
public class HttpSessionConfig {
	
	@Bean
	public LettuceConnectionFactory connectionFactory() {
		return new LettuceConnectionFactory();
	}

}
