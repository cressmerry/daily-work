package com.tek.log.analyzer;

public enum LOG_TYPE {
	INFO, WARNING, ERROR;

	static boolean validateLogType(String typeString) {
		try {
			LOG_TYPE.valueOf(typeString);
			return true;
		} catch (IllegalArgumentException ex) {
			return false;
		}
	}
}