package com.demoapp.demo.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.demoapp.demo.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(AuthController.class)
class AuthControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private UserService userService;

  // Teste da mensagem de erro no email inválido
  @Test
  void signup_returns422_whenEmailInvalid() throws Exception {
    when(userService.isEmailValid("joaoexemplo.com")).thenReturn(false);

    String body = """
      {"email":"joaoexemplo.com","password":"Abcd1234@"}
      """;

    mockMvc.perform(
        post("/auth/signup")
            .contentType(MediaType.APPLICATION_JSON)
            .content(body)
      )
      .andExpect(status().isUnprocessableEntity())
      .andExpect(jsonPath("$.message").value("E-mail inválido"))
      .andExpect(jsonPath("$.status").value(422));
  }
}