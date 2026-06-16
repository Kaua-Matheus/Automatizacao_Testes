import { test, expect } from '@playwright/test'

// Verifica se o signin com credenciais válidas está funcionando corretamente
test('api signin', async ({ request }) => {

    const email: String = "emailtest@gmail.com";
    const password: String = "Aaaa1234@";

    const response = await request.post(
        'http://localhost:8080/auth/signin',
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


// Verifica signin com senha errada
test('api signin senha errada', async ({ request }) => {

    const email: String = "emailtest@gmail.com";
    // Senha correta Aaaa1234@
    const password: String = "SenhaErrada1234@";

    const response = await request.post(
        'http://localhost:8080/auth/signin',
        {
            data: {
                "email": email,
                "password": password
            }
        }
    );

    // Verificação se o status de resposta da API bate com o que deve ser
    expect(response.status()).toBe(401);

    const body = await response.json();


    expect(body).toBeDefined();

    // Verifica mensagem padrão de email em uso
    expect(body.message).toBe("Credenciais inválidas");

    // Verifica se o status retornado no body é 409
    expect(body.status).toBe(401);
});