package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;

import com.example.demo.controller.NoteController;
import com.example.demo.service.NoteService;

@SpringBootApplication
public class Day21Application {

	public static void main(String[] args) {
		SpringApplication.run(Day21Application.class, args);
	}

}
