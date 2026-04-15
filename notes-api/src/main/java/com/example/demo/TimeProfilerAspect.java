package com.example.demo;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Note;


@Aspect
@Component
public class TimeProfilerAspect {
	
	@Around("execution(* com.example.demo.services.NotesService.*(..))")
	public Iterable<Note> calculationTime(ProceedingJoinPoint pjp) throws Throwable{
		long start = System.currentTimeMillis();
		Iterable<Note> result = (Iterable)pjp.proceed();
		long end = System.currentTimeMillis();
		System.out.println("Total Time: " + (end-start) + "ms");
		return result;
	}
}
