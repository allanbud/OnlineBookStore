package com.onlinestore.config;

import com.onlinestore.service.UserSecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.session.data.redis.config.ConfigureRedisAction;
import org.springframework.session.web.http.HeaderHttpSessionStrategy;
import org.springframework.session.web.http.HttpSessionStrategy;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private Environment env;
	
	@Autowired
//DONE define class
	private UserSecurityService userSecurityService;
	
	private BCryptPasswordEncoder passwordEncoder() {
//DONE define SecurityUtility
		return SecurityUtility.passwordEncoder();
	}

//what should be publicly available? separate from security
	private static final String[] PUBLIC_MATCHERS = {
			"/css/**",
			"/js/**",
			"/image/**",
			"/product/**",
			"/user/**"
	};
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
				http.csrf(). //cross-line request forgery JUST need it disable
				disable().

				cors().
				disable().

				httpBasic().
				and().
				authorizeRequests().
				antMatchers(PUBLIC_MATCHERS).
				permitAll().
				anyRequest().
				authenticated();
	}
	
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userSecurityService).passwordEncoder(passwordEncoder());
	}

/*
Keyspace events are required for session expiry hence Spring Session attempts to auto-configure your Redis
server. You need to configure notify-keyspace-events to Egx (or A for all) to make Spring Session work.

You can also provide a bean of the type

ConfigureRedisAction

to configure Redis programmatically.
 */

	@Bean
	ConfigureRedisAction configureRedisAction() {
		return ConfigureRedisAction.NO_OP;
	}


	@Bean
	public HttpSessionStrategy httpSessionStrategy() {
		return new HeaderHttpSessionStrategy();
	}

}
