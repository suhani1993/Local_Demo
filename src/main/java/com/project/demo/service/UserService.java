package com.project.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.demo.dao.UserDao;
import com.project.demo.model.Employee;

@Service
public class UserService {

	@Autowired
	private UserDao userDao;
	
	public void login(Employee employee) {
		userDao.login(employee);
	}

	
}
