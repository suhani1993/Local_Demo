package com.project.demo.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.demo.model.Employee;
import com.project.demo.service.UserService;

@Controller
@RequestMapping("user")
public class UserController {
	
	@Autowired
	MongoTemplate mongoTemplate;
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "login", method = RequestMethod.GET)
	public String login(HttpServletRequest request) {
		
		int i;
		
		Employee employee = new Employee();
		employee.setName("suhani");
		
		userService.login(employee);
		
		return "login";
	}
	
	
	@RequestMapping(value = "addUser", method = RequestMethod.POST)
	public void addUser(@RequestParam("userName") String userName, @RequestParam("password") String password) {
		
		System.out.println("inside add user");
		System.out.println("username :: " + userName + " password :: " + password);
//		Employee employee = new Employee();
//		employee.setName("suhani");
//		
//		userService.login(employee);
//		
//		return "login";
	}
	
}
