package com.tek.log.analyzer.main;

import java.io.IOException;
import java.util.logging.Logger;

import com.tek.log.analyzer.LogAnalyzer;

public class MainApp {
	private static final Logger logger = Logger.getLogger(MainApp.class.getName());

	public static void main(String[] args) {
		if (args.length == 0) {
			System.out.println("Usage: java -jar log-analyzer.jar <filename>");
		} else {
			String filepath = args[0];
			try {
				LogAnalyzer analyzer = new LogAnalyzer(filepath);
				System.out.println(analyzer.analyze());
			} catch (IOException e) {
				logger.severe(e.getMessage());
			}
		}
	}

}
