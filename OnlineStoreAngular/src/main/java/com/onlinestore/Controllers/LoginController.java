package com.onlinestore.Controllers;


import com.onlinestore.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

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
		System.out.println(request.getRemoteHost());
		
		String remoteHost = request.getRemoteHost();
		int portNumber = request.getRemotePort();
		
		System.out.println("\u001B[31m" + remoteHost+":"+portNumber + "\u001B[0m");
		System.out.println(request.getRemoteAddr());
		
		return Collections.singletonMap("token", session.getId());
	}

	@RequestMapping(value = "/checkSession")
	public ResponseEntity checkSession() {
		checkSession().toString();
		return new ResponseEntity("This is Active Session!", HttpStatus.OK);
	}
}
