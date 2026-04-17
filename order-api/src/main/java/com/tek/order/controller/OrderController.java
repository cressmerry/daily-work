package com.tek.order.controller;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.tek.order.dto.request.StatusUpdateRequest;
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
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public OrderEntity getOrderById(@PathVariable Integer id) {
		return orderService.getOrderById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	@PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
	public Iterable<OrderEntity> getOrders() {
		return orderService.getOrders();
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
	public void deleteOrderById(@PathVariable Integer id) {
		orderService.deleteOrderById(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
	public Integer createOrder(@RequestBody @Valid OrderEntity order) throws IOException {
		return orderService.addOrder(order);
	}

	@PatchMapping("/{id}/status")
	@ResponseStatus(HttpStatus.OK)
	@PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
	public OrderEntity updateStatus(@PathVariable Integer id, @RequestBody StatusUpdateRequest request) {
		return orderService.updateOrderStatus(id, request.getStatus());
	}

}