package com.tek.order.service;

import java.io.IOException;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.tek.order.entity.OrderEntity;
import com.tek.order.entity.STATUS;
import com.tek.order.entity.User;
import com.tek.order.repository.OrderRepository;

@Service
public class OrderService {
	@Autowired
	OrderRepository orderRepository;

	private User getCurrentUser() {
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (principal instanceof UserDetailsImplementation) {
			UserDetailsImplementation userDetails = (UserDetailsImplementation) principal;
			User user = new User();
			user.setId(userDetails.getId());
			return user;
		}
		throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated");
	}

	public Optional<OrderEntity> getOrderById(Integer id) {
	    OrderEntity order = orderRepository.findById(id)
	            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

	    UserDetailsImplementation currentUser = (UserDetailsImplementation) SecurityContextHolder
	            .getContext().getAuthentication().getPrincipal();

	    boolean isAdmin = currentUser.getAuthorities().stream()
	            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

	    if (!isAdmin && !order.getUser().getId().equals(currentUser.getId())) {
	        throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Access Denied");
	    }
	    return Optional.of(order);
	}

	public void deleteOrderById(Integer id) {
		orderRepository.deleteById(id);
	}

	@Transactional(rollbackFor = Exception.class)
	public Integer addOrder(OrderEntity order) throws IOException {
		order.setUser(getCurrentUser());

		if (order.getOrderLines() != null) {
			order.getOrderLines().forEach(line -> line.setOrder(order));
		}
		orderRepository.save(order);
		return order.getId();
	}

	public Iterable<OrderEntity> getOrders() {
	    UserDetailsImplementation currentUser = (UserDetailsImplementation) SecurityContextHolder
	            .getContext().getAuthentication().getPrincipal();

	    boolean isPrivileged = currentUser.getAuthorities().stream()
	            .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN") || 
	                           a.getAuthority().equals("ROLE_MODERATOR"));

	    if (isPrivileged) {
	        return orderRepository.findAll();
	    } else {
	        User user = new User();
	        user.setId(currentUser.getId());
	        
	        return orderRepository.findByUser(user);
	    }
	}

	@Transactional
	public OrderEntity updateOrderStatus(Integer id, STATUS newStatus) {
		OrderEntity order = orderRepository.findById(id)
				.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

		STATUS currentStatus = order.getStatus();
		boolean isValid = false;
		if (currentStatus == STATUS.CREATED && newStatus == STATUS.IN_TRANSIT) {
			isValid = true;
		} else if (currentStatus == STATUS.IN_TRANSIT && newStatus == STATUS.DELIVERED) {
			isValid = true;
		}
		if (!isValid) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
					"Invalid status transition from " + currentStatus + " to " + newStatus);
		}
		order.setStatus(newStatus);
		return orderRepository.save(order);
	}
}
