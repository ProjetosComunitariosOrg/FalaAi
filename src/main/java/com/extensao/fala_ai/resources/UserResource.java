package com.extensao.fala_ai.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.extensao.fala_ai.dto.UserRequestDTO;
import com.extensao.fala_ai.dto.UserResponseDTO;
import com.extensao.fala_ai.services.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/users")
@Tag(name = "Users", description = "Gerenciamento de usuários")
public class UserResource {
	
	@Autowired
	private UserService userService;
	
	@Operation(summary = "Buscar todos os usuários")
	@ApiResponse(responseCode = "200", description = "Lista retornada com sucesso")
	@GetMapping
	public ResponseEntity<List<UserResponseDTO>> findAll()
	{
		List<UserResponseDTO> list = userService.findAll();
		return ResponseEntity.ok().body(list);
	}
	
	@Operation(summary = "Buscar usuario por ID")
	@ApiResponse(responseCode = "200", description = "Usuario retornado com sucesso")
	@ApiResponse(responseCode = "400", description = "Usuario não encontrado")
	@GetMapping(value = "/{id}")
	public ResponseEntity<UserResponseDTO> findById(@PathVariable Long id)
	{
		UserResponseDTO user = userService.findById(id);
		if(user == null)
		{
			return ResponseEntity.notFound().build();
		}		
		return ResponseEntity.ok().body(user);		
	}
	
	@Operation(summary = "Criar um novo usuário")
	@ApiResponse(responseCode = "201", description = "Usuário criado com sucesso")
	@PostMapping(value = "/createUser")
	public ResponseEntity<Void> createUser(@Valid @RequestBody UserRequestDTO data) {
	    userService.createUser(
	        data.name(), 
	        data.cpf(), 
	        data.password(), 
	        data.phone()
	    );
	    
	    return ResponseEntity.status(HttpStatus.CREATED).build();
	}

}
