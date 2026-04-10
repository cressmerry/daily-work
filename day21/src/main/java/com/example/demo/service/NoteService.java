package com.example.demo.service;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Order1;
import com.example.demo.repository.Order1Repository;

@Service
public class NoteService {
	@Autowired
	Order1Repository order1Repository;

	@Autowired
	EmailService emailService;
	@Autowired
	PaymentService paymentService;
	
	public Optional<Order1> getOrderById(Integer id) {
		return order1Repository.findById(id);
	}

	public void deleteOrderById(Integer id) {
		order1Repository.deleteById(id);
		;
	}
	@Transactional(rollbackFor = Exception.class, noRollbackFor = {IOException.class})
	public Integer addOrder(Order1 order1) throws IOException {
		emailService.send();
		order1Repository.save(order1);
		return order1.getId();
	}
}
