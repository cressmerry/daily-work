package log.analyzer;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.tek.log.analyzer.model.LOG_TYPE;

class LogEntryTest {

	@Test
	void testSuccessfullValidateLogType() {
		assertTrue(LOG_TYPE.validateLogType("INFO"));
	}
	
	@Test
	void testUnsuccessfullValidateLogType() {
		assertFalse(LOG_TYPE.validateLogType("NOT-A-TYPE"));
	}

}
