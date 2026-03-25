package com.extensao.fala_ai.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.extensao.fala_ai.dto.UserResponseDTO;
import com.extensao.fala_ai.entities.User;
import com.extensao.fala_ai.entities.enums.AccessLevel;
import com.extensao.fala_ai.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	public List<UserResponseDTO> findAll()
	{		
		List<User> users = userRepository.findAll();
		return users.stream().map(UserResponseDTO::new).toList();
	}
	
	public UserResponseDTO findById(Long id)
	{
		Optional<User> obj = userRepository.findById(id);
		return userRepository.findById(id)
	            .map(UserResponseDTO::new) // Converte User para UserResponseDTO se existir
	            .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o ID: " + id));
	}
	
	@Transactional
	public User createUser(String name, String cpf, String password, String phone)
	{
		String encodedPassword = passwordEncoder.encode(password);
		User user = new User(null,name,cpf, encodedPassword,phone, AccessLevel.USER);
		
		return userRepository.save(user);
		
	}

}
