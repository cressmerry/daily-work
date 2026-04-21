package com.tek.order.dto.event;


import java.io.Serializable;
import java.util.List;

public class OrderPlacedEvent implements Serializable {
    private String email;
    private Integer orderId;
    private String street;
    private String city;
    private double totalAmount;

    public OrderPlacedEvent() {}

    public OrderPlacedEvent(String email, Integer orderId, String street, String city, double totalAmount) {
        this.email = email;
        this.orderId = orderId;
        this.street = street;
        this.city = city;
        this.totalAmount = totalAmount;
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Integer getOrderId() { return orderId; }
    public void setOrderId(Integer orderId) { this.orderId = orderId; }
    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(double totalAmount) { this.totalAmount = totalAmount; }
}