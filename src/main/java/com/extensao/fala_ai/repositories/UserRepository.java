package com.extensao.fala_ai.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.extensao.fala_ai.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
