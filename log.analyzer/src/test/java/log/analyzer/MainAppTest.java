package log.analyzer;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.PrintStream;
import java.nio.file.Files;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.tek.log.analyzer.main.MainApp;

public class MainAppTest {
	private final PrintStream originalOut = System.out;
	private ByteArrayOutputStream outContent;

	@BeforeEach
	public void setUpStreams() {
		outContent = new ByteArrayOutputStream();
		System.setOut(new PrintStream(outContent));
	}

	@AfterEach
	public void restoreStreams() {
		System.setOut(originalOut);
	}

	@Test
	public void testMainWithNoArgs() {
		MainApp.main(new String[0]);
		String out = outContent.toString().trim();
		assertEquals("Usage: java -jar log-analyzer.jar <filename>", out);
	}

	@Test
	public void testSuccessfullMainWithValidFile() throws Exception {
		File temp = File.createTempFile("test-log", ".log");
		temp.deleteOnExit();
		String content = "INFO: Hello World\nERROR: BAD WORLD";
		Files.writeString(temp.toPath(), content);

		MainApp.main(new String[] { temp.getAbsolutePath() });

		String out = outContent.toString().trim();
		assertTrue(!out.isEmpty());
		assertTrue(out.contains("INFO=1"));
		assertTrue(out.contains("ERROR=1"));
		
	}

	@Test
	public void testWhenFileDoesNotExist() {
		String nonExistent = "does-not-exist.log";
		MainApp.main(new String[] { nonExistent });

		String out = outContent.toString().trim();
		assertTrue(!out.contains("Usage:"));
		assertTrue(!out.contains("file not found"));
	}
}
