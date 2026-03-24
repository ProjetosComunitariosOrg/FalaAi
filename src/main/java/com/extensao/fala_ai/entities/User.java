package com.extensao.fala_ai.entities;

import java.io.Serializable;
import java.util.Objects;

import com.extensao.fala_ai.entities.enums.AccessLevel;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Schema(description = "Entidade Usuario")
@Entity
@Table(name = "Usuario")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	
	
	@Schema(description = "ID do usuario", example = "1")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Schema(description = "Nome do usuario", example = "Nome do Usuario")
	private String name;
	@Schema(description = "CPF do usuario", example = "01234567890")
	private String cpf;
	@Schema(description = "Senha do usuario", example = "kawn2opdop")
	private String password;
	@Schema(description = "Celular do usuario", example = "34912345678")
	private String phone;
	@Schema(description = "Nível de acesso do usuario", example = "USER")
	private AccessLevel accessLevel;
	
	public User()
	{
		
	}
	public User(Long id, String name, String cpf, String password, String phone, AccessLevel accessLevel) {
		super();
		this.id = id;
		this.name = name;
		this.cpf = cpf;
		this.password = password;
		this.phone = phone;
		this.accessLevel = accessLevel;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public AccessLevel getAccessLevel() {
		return accessLevel;
	}
	public void setAccessLevel(AccessLevel accessLevel) {
		this.accessLevel = accessLevel;
	}
	@Override
	public int hashCode() {
		return Objects.hash(id);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		return Objects.equals(id, other.id);
	}
	
	
}
