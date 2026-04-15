package com.tek.order.service;

import java.io.IOException;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tek.order.entity.OrderEntity;
import com.tek.order.repository.OrderRepository;

@Service
public class OrderService {
	@Autowired
	OrderRepository orderRepository;
	
	public Optional<OrderEntity> getOrderById(Integer id) {
		return orderRepository.findById(id);
	}

	public void deleteOrderById(Integer id) {
		orderRepository.deleteById(id);
		;
	}
	@Transactional(rollbackFor = Exception.class)
	public Integer addOrder(OrderEntity order) throws IOException {
		orderRepository.save(order);
		return order.getId();
	}

	public Iterable<OrderEntity> getOrders() {
		return orderRepository.findAll();
	}
}
