package com.extensao.fala_ai.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.extensao.fala_ai.entities.User;
import com.extensao.fala_ai.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	
	public List<User> findAll()
	{
		return userRepository.findAll();
	}
	
	public User findById(Long id)
	{
		Optional<User> obj = userRepository.findById(id);
		return obj.get();
	}

}
