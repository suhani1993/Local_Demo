package com.project.demo.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="employee")
public class Employee {

	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "Employee [name=" + name + "]";
	}

}
