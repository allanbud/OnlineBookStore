package com.onlinestore.controllers;


import com.onlinestore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Map;

@RestController
public class LoginController {
	@Autowired
	private UserService userService;

	@RequestMapping("/token")
	public Map<String, String> token(HttpSession session, HttpServletRequest request) {

		String remoteHost = request.getRemoteHost();
		int portNumber = request.getRemotePort();

		System.out.println("\u001B[34m" + "Session ID: " + session.getId() + "\u001B[0m");

		return Collections.singletonMap("token", session.getId());
	}

	@RequestMapping(value = "/checkSession")
	public ResponseEntity<String> checkSession() {
		System.out.println("\u001B[36m" + "checkSession" + "\u001B[0m");

		return new ResponseEntity<>("This is Active Session!", HttpStatus.OK);
	}



	@RequestMapping(value = "/user/logout", method = RequestMethod.POST)
	public ResponseEntity logout() {
		SecurityContextHolder.clearContext();
		return new ResponseEntity("You have logged out", HttpStatus.OK);
	}
}