package com.demoapp.demo.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;

import org.junit.jupiter.api.Test;

import com.demoapp.demo.repository.UserRepository;


public class UserServiceTest {

    // --- Email Tests ---
    // Verifica um email válido (true)
    @Test
    void isEmailValid_ReturnsTrueForDefaultEmail() {
        UserService service = new UserService(mock(UserRepository.class));

        assertTrue(service.isEmailValid("kauam@exemplo.com"));
    }


    // Email com dois @ (false)
    @Test
    void isEmailValid_ReturnsFalseWithWrongEmails() {
        UserService service = new UserService(mock(UserRepository.class));
        
        assertFalse(service.isEmailValid("ama.@2joão@exemplo.com"));
    }

    // Email com caracteres especiais (false)
    @Test
    void isEmailValid_ReturnsFalseWithEmailsWithSpecialCharacters() {
        UserService service = new UserService(mock(UserRepository.class));

        assertFalse(service.isEmailValid("matheus%##virgo@g(mail).com"));
    }

    // Somente @ (false)
    @Test
    void isEmailValid_ReturnFalseWithOnlyAt() {
        UserService service = new UserService(mock(UserRepository.class));

        assertFalse(service.isEmailValid("@"));
    }

    // null (false)
    @Test
    void isEmailValid_ReturnsFalseForNull() {
        UserService service = new UserService(mock(UserRepository.class));

        assertFalse(service.isEmailValid(null));
    }
    

    // --- Password Tests ---
    // Senha no padrão correto (true)
    @Test
    void isPasswordValid_ReturnsTrueForDefaultPassword() {
        UserService service = new UserService(mock(UserRepository.class));

        assertTrue(service.isPasswordValid("Abacax1@"));
    }


    // Senha com somente números (false)
    @Test
    void isPasswordValid_ReturnsFalseWithWrongPassword() {
        UserService service = new UserService(mock(UserRepository.class));
        
        assertFalse(service.isPasswordValid("123123123"));
    }

    // Senha menor do que o necessário (false)
    @Test
    void isPasswordValid_ReturnsFalseWithShorterPassword() {
        UserService service = new UserService(mock(UserRepository.class));
        
        assertFalse(service.isPasswordValid("Aaa@111"));
    }

}