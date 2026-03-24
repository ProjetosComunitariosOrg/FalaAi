package com.extensao.fala_ai.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Desativa a proteção contra CSRF
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // -> Liberado tudo para testes
            )
            .headers(headers -> headers.frameOptions(frame -> frame.disable())); // Libera o console do H2
        
        return http.build();
    }
}