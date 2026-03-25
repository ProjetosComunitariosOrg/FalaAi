package com.extensao.fala_ai.dto;

import com.extensao.fala_ai.entities.User;

public record UserResponseDTO(Long id, String username, String phone) {
	public UserResponseDTO(User user)
	{
		this(user.getId(), user.getName(), user.getPhone());
	}

}
