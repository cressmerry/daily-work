package lmsWithList;

public class ValidationUtils {
	public static boolean validateStringValue(String input) {
		return (input != null && !input.trim().equals(""));
	}

	public static boolean validateNumericInput(float numericInput) {
		return (numericInput > 0);
	}

}
