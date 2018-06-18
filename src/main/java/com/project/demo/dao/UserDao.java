package com.project.demo.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import com.project.demo.model.Employee;

@Repository
public class UserDao {
	
	@Autowired
	private MongoTemplate mongoTemplate;

	public void login(Employee employee) {
		mongoTemplate.save(employee);
	}

}
