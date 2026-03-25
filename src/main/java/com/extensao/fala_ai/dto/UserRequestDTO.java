package com.extensao.fala_ai.dto;

import org.hibernate.validator.constraints.br.CPF;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserRequestDTO(
	@NotBlank(message =  "O nome não pode estar em branco!")
    @Schema(example = "Joao Silva") String name,
    @NotBlank
    @CPF(message = "CPF inválido")
    @Schema(example = "12345678901") String cpf,
    @NotBlank
    @Size(min = 8, message = "A senha deve ter no mínimo 8 caracteres")
    @Schema(example = "senha123") String password,
    @NotBlank
    @Pattern(regexp = "\\d{11}", message = "O telefone deve ter 11 dígitos")
    @Schema(example = "34912345678") String phone
) {
}