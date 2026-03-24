package com.tek.log.analyzer;

import java.io.File;

import java.util.logging.Logger;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tek.log.analyzer.exception.LogParseException;
import com.tek.log.analyzer.model.LOG_TYPE;
import com.tek.log.analyzer.model.LogEntry;

public class LogAnalyzer {
	private static final Logger logger = Logger.getLogger(LogAnalyzer.class.getName());
	File logFile;

	public LogAnalyzer(String filepath) throws IOException {
		this(new File(filepath));

	}

	public LogAnalyzer(File file) throws IOException {
		if (!file.exists())
			throw new FileNotFoundException(file + " file not found");
		logFile = file;
	}

	public Map<LOG_TYPE, Integer> analyze() throws IOException {
		return analyze(true);
	}

	public Map<LOG_TYPE, Integer> analyze(boolean skipBadEntries) throws IOException {
		Map<LOG_TYPE, Integer> logCounts = new HashMap<>();
		List<String> lines;
		lines = Files.readAllLines(logFile.toPath(), StandardCharsets.UTF_8);
		int lineNumber = 0;
		for (String entryString : lines) {
			lineNumber++;
			try {
				LogEntry entry = parseEntry(entryString);
				logCounts.put(entry.getType(), logCounts.getOrDefault(entry.getType(), 0) + 1);

			} catch (LogParseException lpex) {
				logger.info(
						"Skipped Entry At Line Number: " + lineNumber + " due to the problem: " + lpex.getMessage());
			}
		}

		return logCounts;
	}

	public static LogEntry parseEntry(String entry) throws LogParseException {
		if (entry == null)
			throw new LogParseException("Input is null");
		String trimmedEntry = entry.trim();
		if (trimmedEntry.isEmpty())
			throw new LogParseException("Empty log line");
		int colonIndex = trimmedEntry.indexOf(':');
		if (colonIndex < 0) {
			throw new LogParseException("Log Format is TYPE : Message");
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
