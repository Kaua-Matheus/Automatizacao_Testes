import { test, expect } from '@playwright/test'

// Verifica se o signup com credenciais válidas está funcionando corretamente
test('api signup', async ({ request }) => {

    const email: String = "emailtest@gmail.com";
    const password: String = "Aaaa1234@";

    const response = await request.post(
        'http://localhost:8080/auth/signup',
        {
            data: {
                "email": email,
                "password": password
            }
        }
    );

    expect(response.ok()).toBeTruthy();

    const body = await response.json();


    expect(body).toBeDefined();

    expect(body.id).toBeDefined();

    expect(body.email).toBe(email);
    console.log("Email informado igual ao retornado? ", body.email == email)

    expect(body.password).toBe(password);
    console.log("Senha informada igual a retornada? ", body.password == password)
});


// Verifica se o signup com email já cadastrado
test('api signup email duplicado', async ({ request }) => {

    const email: String = "emailtest@gmail.com";
    const password: String = "Aaaa1234@";

    const response = await request.post(
        'http://localhost:8080/auth/signup',
        {
            data: {
                "email": email,
                "password": password
            }
        }
    );

    // Verificação se o status de resposta da API bate com o que deve ser
    expect(response.status()).toBe(409);

    const body = await response.json();


    expect(body).toBeDefined();

    // Verifica mensagem padrão de email em uso
    expect(body.message).toBe("E-mail já está em uso");

    // Verifica se o status retornado no body é 409
    expect(body.status).toBe(409);
});