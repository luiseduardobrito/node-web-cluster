module.exports = {

	// Error Handling
	error: {

		unknown: "Erro desconhecido",

		// Error Levels
		critical: "Crítico",
		warning: "Aviso",

		// HTML Errors
		not_found: "Página não encontrada",
		internal: "Erro interno",
	},

	type: {

		// validation errors
		not_null: "O valor não pode ser nulo",
		not_numeric: "O valor especificado não é numérico",
		not_integer: "O valor especificado não é um número inteiro",
		not_string: "O valor especificado não é texto",
		not_encrypted: "O valor especificado não foi encriptado",
		not_enough_length: "O valor especificado deve possuir 8 ou mais caracteres",
		not_email: "O valor especificado não é um email válido",
		not_valid_domain: "O domínio do email especificado não é válido",
		not_object: "O valor especificado não é um objeto",
		not_array: "O valor especificado não é uma lista",
	},

	user: {

		email_registered: "Email já registrado no sistema",
		create_success: "Usuário criado com sucesso",
		create_error: "Erro ao criar novo usuário",

		not_logged_in: "Usuário não autenticado",

		invalid_credentials: "Credenciais inválidas ou incorretas",
		login_success: "Login efetuado com sucesso",
		login_error: "O login não pode ser efetuado",

		logout_success: "Logout efetuado com sucesso",
		logout_error: "O logout não pode ser efetuado"
	}
}