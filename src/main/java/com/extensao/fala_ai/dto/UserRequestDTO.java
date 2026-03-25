package com.extensao.fala_ai.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record UserRequestDTO(
    @Schema(example = "Joao Silva") String name,
    @Schema(example = "12345678901") String cpf,
    @Schema(example = "senha123") String password,
    @Schema(example = "34912345678") String phone
) {
}