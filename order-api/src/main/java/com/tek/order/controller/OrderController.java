package com.tek.order.controller;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.tek.order.entity.OrderEntity;
import com.tek.order.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/order")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public OrderEntity getOrderById(@PathVariable Integer id) {
		return orderService.getOrderById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public Iterable<OrderEntity> getOrders() {
		return orderService.getOrders();
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteOrderById(@PathVariable Integer id) {
		orderService.deleteOrderById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Integer createOrder(@RequestBody @Valid OrderEntity order) throws IOException {
		return orderService.addOrder(order);
	}
}