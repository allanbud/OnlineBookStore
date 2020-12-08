package com.onlinestore.config;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RequestFilter implements Filter {
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) {

//requests coming from http
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;
//TODO * temp star mark because any origin could not be safe
		response.setHeader("Access-Control-Allow-Origin", "*");
//methods to be used
		response.setHeader("Access-control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
//
		response.setHeader("Access-Control-Allow-Headers", "x-requested-with, x-auth-token");
//
		response.setHeader("Access-Control-Max-Age", "3600");
//
		response.setHeader("Access-Control-Allow-Credentials", "true");
//
		if(!(request.getMethod().equalsIgnoreCase("OPTIONS"))) {
			try {
				filterChain.doFilter(servletRequest, servletResponse);
			} catch (Exception e) {
				e.printStackTrace();
			}
//if coming request is not Options then proceed
		} else {
			System.out.println("Pre-fight");
			response.setHeader("Access-Control-Allowed-Methods", "POST, GET, DELETE");
			response.setHeader("Access-Control-Max-Age", "3600");
			response.setHeader("Access-Control-Allow-Headers", "authorization, content-type, x-auth-token, " +
                    "access-control-request-headers,access-control-request-method,accept,origin,authorization,x-requested-with");
			response.setStatus(HttpServletResponse.SC_OK);
		}
	}
	
	public void init(FilterConfig filterConfig) {}
	
	public void destroy() {}
}
