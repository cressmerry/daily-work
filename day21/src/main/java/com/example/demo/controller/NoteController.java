package com.example.demo.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Order1;
import com.example.demo.service.NoteService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/order")
public class NoteController {
	@Autowired
	NoteService noteService;

	@GetMapping("/{id}")
	Optional<Order1> getOrderById(@PathVariable Integer id) {
		return noteService.getOrderById(id);
	}

	@DeleteMapping("/{id}")
	void deleteOrderById(@PathVariable Integer id) {
		noteService.deleteOrderById(id);
	}

	@PostMapping
	Integer createOrder(@RequestBody @Valid Order1 order) {
		return noteService.addOrder(order);
	}
	
	

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, String> handleValidationExceptions(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String errorMessage = error.getDefaultMessage();
			errors.put(fieldName, errorMessage);
		});
		return errors;
	}

	@ExceptionHandler(Exception.class)
	public String handleExceptions(Exception ex) {
		return "Something Went Wrong";
	}

}
