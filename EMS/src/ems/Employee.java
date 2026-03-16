package ems;

import java.util.Date;

public abstract class Employee {
	private String name;
	private float salary;
	private boolean isEmployed;
	private Date dateOfJoining;
	
	public void hire() {
		this.isEmployed = true;
	}
	public void terminate() {
		this.isEmployed = false;
	}
	public void getHistory() {
		System.out.println("Name: " + name + "\nDate of joining was " + dateOfJoining);
	}
	public abstract String getCurrent();
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public float getSalary() {
		return salary;
	}
	public void setSalary(float salary) {
		this.salary = salary;
	}
}	
