module.exports = {

	response: {

		// do not change unless you know what you're doing
		success: "success",
		error: "error",
		unhandled_error: "Problem serving app response"
	},

	// Error Handling
	error: {

		unknown: "Unknown error",

		// Error Levels
		critical: "Critical",
		warning: "Warning",

		// HTML Errors
		not_found: "Page not found",
		internal: "Internal server error",
	},

	type: {

		// validation errors
		not_null: "The input should not be null",
		not_numeric: "Input is not a number",
		not_integer: "Input is not an integer",
		not_string: "The input should be a string",
		not_encrypted: "The input is not encrypted",
		not_enough_length: "The input should be at least 8 characters length",
		not_email: "The input is not a valid email",
		not_valid_domain: "The input is not a valid domain",
		not_object: "The input is not a valid object",
		not_array: "The input is not a valid array",
	},

	user: {

		email_registered: "Email already registered",
		create_success: "User created successfully",
		create_error: "User could not be created",

		not_logged_in: "User not logged in",

		invalid_credentials: "Invalid or incorrect credentials",
		login_success: "User logged in successfully",
		login_error: "User could not be logged in",

		logout_success: "User logged out successfully",
		logout_error: "User could not be logged out"
	}
}