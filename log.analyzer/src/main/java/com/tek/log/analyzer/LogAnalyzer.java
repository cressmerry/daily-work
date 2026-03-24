package com.tek.log.analyzer;

import java.io.File;
import java.io.FileNotFoundException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LogAnalyzer {

	public static void main(String[] args) throws FileNotFoundException {
		Map<LOG_TYPE, Integer> logCounts = new HashMap<>();
		File logFile = new File("C:\\Workspace\\log.analyzer\\src\\main\\resources\\system.log");
		if (!logFile.exists()) {
			System.out.println("Hello World");
			throw new FileNotFoundException("system.log file not found");
		}
		try {
			List<String> lines = Files.readAllLines(logFile.toPath(), StandardCharsets.UTF_8);
			for (String entryString : lines) {
				LogEntry entry = parseEntry(entryString);
				if (!logCounts.containsKey(entry.getType()))
					logCounts.put(entry.getType(), (Integer) 0);
				logCounts.put(entry.getType(), logCounts.get(entry.getType()) + 1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println(logCounts);
	}

	public static LogEntry parseEntry(String entry) throws LogParseException {
		if (entry == null)
			throw new LogParseException("Input is null");
		String trimmedEntry = entry.trim();
		if (trimmedEntry.isEmpty())
			throw new LogParseException("Empty log line");
		int colonIndex = trimmedEntry.indexOf(':');
		if (colonIndex <= 0) {
			throw new LogParseException("Entry must be in format: 'TYPE: message'");
		}
		String typeString = trimmedEntry.substring(0, colonIndex).trim();
		String messageString = trimmedEntry.substring(colonIndex + 1).trim();

		if (typeString.isEmpty())
			throw new LogParseException("Missing log type");
		if (!typeString.matches("[A-Z]+")) {
			typeString = typeString.toUpperCase();
		}
		if (messageString.isEmpty())
			throw new LogParseException("Missing log message");

		if (!LOG_TYPE.validateLogType(typeString)) {
			throw new LogParseException(typeString + " is not a valid log type.");
		}
		LOG_TYPE type = LOG_TYPE.valueOf(typeString);
		return new LogEntry(type, messageString);

	}

}
