package com.extensao.fala_ai.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.extensao.fala_ai.entities.User;
import com.extensao.fala_ai.entities.enums.AccessLevel;
import com.extensao.fala_ai.repositories.UserRepository;

@Configuration
@Profile("test")
public class TestConfig implements CommandLineRunner {
	@Autowired 
	UserRepository userRepository;
	@Override
	public void run(String... args) throws Exception {
	
		User user1 = new User(null,"Alex M","123456789", "senha123","34912345678", AccessLevel.USER);
		User user2 = new User(null,"Julio Costa","123456789", "senha123","34912342678", AccessLevel.ADMIN);
		userRepository.saveAll(Arrays.asList(user1,user2));
	}
}
