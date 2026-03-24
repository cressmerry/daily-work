package com.tek.log.analyzer.model;

public enum LOG_TYPE {
	INFO, WARNING, ERROR;

	public static boolean validateLogType(String typeString) {
		try {
			LOG_TYPE.valueOf(typeString);
			return true;
		} catch (IllegalArgumentException ex) {
			return false;
		}
	}
}