package log.analyzer;

public class LogEntry {
	private final LOG_TYPE type;
	private final String message;

	public LogEntry(LOG_TYPE type, String message) {
		this.type = type;
		this.message = message;
	}

	public LOG_TYPE getType() {
		return type;
	}

	public String getMessage() {
		return message;
	}

	@Override
	public String toString() {
		return type + ": " + message;
	}
}
