package com.demoapp.demo.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;

import org.junit.jupiter.api.Test;

import com.demoapp.demo.repository.UserRepository;


public class UserServiceTest {

    UserService service = new UserService(mock(UserRepository.class));

    // --- Email Tests ---
    // Verifica um email válido (true)
    @Test
    void isEmailValid_ReturnsTrueForDefaultEmail() {
        assertTrue(service.isEmailValid("kauam@exemplo.com"));
    }


    // Email com dois @ (false)
    @Test
    void isEmailValid_ReturnsFalseWithWrongEmails() {
        assertFalse(service.isEmailValid("ama.@2joão@exemplo.com"));
    }

    // Email com caracteres especiais (false)
    @Test
    void isEmailValid_ReturnsFalseWithEmailsWithSpecialCharacters() {
        assertFalse(service.isEmailValid("matheus%##virgo@g(mail).com"));
    }

    // Somente @ (false)
    @Test
    void isEmailValid_ReturnFalseWithOnlyAt() {
        assertFalse(service.isEmailValid("@"));
    }

    // null (false)
    @Test
    void isEmailValid_ReturnsFalseForNull() {
        assertFalse(service.isEmailValid(null));
    }
    

    // --- Password Tests ---
    // Senha no padrão correto (true)
    @Test
    void isPasswordValid_ReturnsTrueForDefaultPassword() {
        assertTrue(service.isPasswordValid("Abacax1@"));
    }


    // Senha com somente números (false)
    @Test
    void isPasswordValid_ReturnsFalseWithWrongPassword() {
        assertFalse(service.isPasswordValid("123123123"));
    }

    // Senha menor do que o necessário (false)
    @Test
    void isPasswordValid_ReturnsFalseWithShorterPassword() {
        assertFalse(service.isPasswordValid("Aaa@111"));
    }

}