package basics;

import java.util.Date;
import java.util.List;

public class Car {
	private String model;
	private String color;
	private float price;
	private String engine;
	private String fuelType;
	private String number;
	private boolean insured;
	private String transmission;
	private String design;
	private float mileage;
	private String brand;
	boolean ev;
	Date manufacturingDate;
	List<Wheel> wheels;
	
	
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public String getEngine() {
		return engine;
	}
	public void setEngine(String engine) {
		this.engine = engine;
	}
	public String getFuelType() {
		return fuelType;
	}
	public void setFuelType(String fuelType) {
		this.fuelType = fuelType;
	}
	public boolean isInsured() {
		return insured;
	}
	public void setInsured(boolean insured) {
		this.insured = insured;
	}
	public String getDesign() {
		return design;
	}
	public void setDesign(String design) {
		this.design = design;
	}
	public float getMileage() {
		return mileage;
	}
	public void setMileage(float mileage) {
		this.mileage = mileage;
	}
	public boolean isEv() {
		return ev;
	}
	public void setEv(boolean ev) {
		this.ev = ev;
	}
	public List<Wheel> getWheels() {
		return wheels;
	}
	public void setWheels(List<Wheel> wheels) {
		this.wheels = wheels;
	}
	public String getModel() {
		return model;
	}
	public String getNumber() {
		return number;
	}
	public String getTransmission() {
		return transmission;
	}
	public String getBrand() {
		return brand;
	}
	public Date getManufacturingDate() {
		return manufacturingDate;
	}
	
}
