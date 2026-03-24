package log.analyzer;

import static org.junit.jupiter.api.Assertions.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Map;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;

import com.tek.log.analyzer.LogAnalyzer;
import com.tek.log.analyzer.exception.LogParseException;
import com.tek.log.analyzer.model.LOG_TYPE;
import com.tek.log.analyzer.model.LogEntry;

class LogAnalyzerTest {

	LogAnalyzer analyzer;
	@TempDir
	File tempDirectory;
	private File tempFile;

	@AfterEach
	void cleanup() {
		if (tempFile != null && tempFile.exists()) {
			tempFile.delete();
		}
	}

	private File writeFile(String name, String content) throws IOException {
		tempFile = new File(tempDirectory, name);
		try (FileWriter fw = new FileWriter(tempFile)) {
			fw.write(content);
		}
		return tempFile;
	}

	// constructor tests

	@Test
	void testConstructorWithNonExistentFilepath() {
		assertThrows(FileNotFoundException.class, () -> {
			LogAnalyzer analyzer = new LogAnalyzer("does-not-exist.log");
		});
	}

	@Test
	void testConstructorWithNonExistentFileObject() {
		assertThrows(FileNotFoundException.class, () -> {
			LogAnalyzer analyzer = new LogAnalyzer(new File(tempDirectory, "does-not-exist.log"));
		});
	}

	// Tests for parseEntry()

	@Test
	void testParseEntryForNull() {
		assertThrows(LogParseException.class, () -> LogAnalyzer.parseEntry(null));
	}

	@Test
	void testParseEntryForBlankSpace() {
		assertThrows(LogParseException.class, () -> LogAnalyzer.parseEntry("   "));
	}

	@Test
	void testParseEntryForMissingColon() {
		assertThrows(LogParseException.class,
				() -> LogAnalyzer.parseEntry("INFO This is bad example of an entry without colon"));
	}

	@Test
	void testParseEntryWithoutAType() {
		assertThrows(LogParseException.class, () -> LogAnalyzer.parseEntry("  : message"));
	}

	@Test
	void testParseEntryForMissingMessage() {
		assertThrows(LogParseException.class, () -> LogAnalyzer.parseEntry("INFO:   "));
	}

	@Test
	void testParseEntrySuccessfullUppercasingOfLowercasedType() throws Exception {
		LogEntry entry = LogAnalyzer.parseEntry("info: message");
		assertEquals(LOG_TYPE.INFO, entry.getType());
		assertEquals("message", entry.getMessage());
	}

	@Test
	void testParseEntryWithInvalidType() {
		LogParseException exception = assertThrows(LogParseException.class,
				() -> LogAnalyzer.parseEntry("NOTATYPE: msg"));
		assertTrue(exception.getMessage().contains("BadTYPE")
				|| exception.getMessage().toLowerCase().contains("not a valid"));
	}

	@Test
	void testParseEntryForValidFormat() throws Exception {
		LogEntry e = LogAnalyzer.parseEntry("ERROR:disk full");
		assertEquals(LOG_TYPE.ERROR, e.getType());
		assertEquals("disk full", e.getMessage());

		LogEntry e2 = LogAnalyzer.parseEntry("INFO : something");
		assertEquals(LOG_TYPE.INFO, e2.getType());
		assertEquals("something", e2.getMessage());
	}

	// Tests for analyze()


	@Test
	void testAnalyzeForEmptyFile() throws IOException {
		String content = "";

		writeFile("mixed.log", content);
		LogAnalyzer analyzer = new LogAnalyzer(tempFile);
		Map<LOG_TYPE, Integer> counts = analyzer.analyze();
		assertTrue(counts.isEmpty());
	}

	@Test
	void testAnalyzeWhenSkippingBadLines() throws Exception {
		String content = """
				INFO: Info message
				ERROR: A faliure
				warning: lowercased message for debug
				BadEntry without a colon
				WARNING:
				WARNING: warning message
				INFO:Another info message
				""";

		writeFile("mixed.log", content);

		LogAnalyzer analyzer = new LogAnalyzer(tempFile);
		Map<LOG_TYPE, Integer> counts = analyzer.analyze();

		assertEquals(5, counts.values().stream().mapToInt(Integer::intValue).sum());
		assertEquals(2, counts.get(LOG_TYPE.INFO).intValue());
		assertEquals(1, counts.get(LOG_TYPE.ERROR).intValue());
		assertEquals(2, counts.get(LOG_TYPE.WARNING).intValue());
	}
}
