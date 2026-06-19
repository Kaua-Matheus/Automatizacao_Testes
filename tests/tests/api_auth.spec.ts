import { test, expect, request } from '@playwright/test'

test.describe("API Signup e Signin", () => {

    const email = `test${Date.now()}@gmail.com`
    const senha = 'Aaaa11234@'

    test('API signup - API signin', async ({ request }) => {

        // API Test 1
        // signup com credenciais válidas
        await test.step('API Signup', async () => {

            const response = await request.post(
                'http://localhost:8080/auth/signup',
                {
                    data: {
                        "email": email,
                        "password": senha
                    }
                }
            );
            expect(response.ok()).toBeTruthy();
            const body = await response.json();
            expect(body).toBeDefined();
            expect(body.id).toBeDefined();
            expect(body.email).toBe(email);
            console.log("Email informado igual ao retornado? ", body.email == email)
            expect(body.password).toBe(senha);
            console.log("Senha informada igual a retornada? ", body.password == senha)
        });


        // API Test 2
        // Verifica se o signup com email já cadastrado
        await test.step('API Signup email cadastrado', async () => {

            const response = await request.post(
                'http://localhost:8080/auth/signup',
                {
                    data: {
                        "email": email,
                        "password": senha
                    }
                }
            );

            // 409 representa conflito de estados no servidor
            expect(response.status()).toBe(409);
            const body = await response.json();
            expect(body).toBeDefined();

            // Verifica mensagem padrão de email em uso
            expect(body.message).toBe("E-mail já está em uso");

            // Verifica se o status retornado no body é 409
            expect(body.status).toBe(409);
        });


        // API Test 3
        // Verifica se o signin com credenciais válidas está funcionando corretamente
        await test.step('API Signin', async () => {

            const response = await request.post(
                'http://localhost:8080/auth/signin',
                {
                    data: {
                        "email": email,
                        "password": senha
                    }
                }
            );

            // Não existe auth
            expect(response.ok()).toBeTruthy();
            const body = await response.json();
            expect(body).toBeDefined();
            expect(body.id).toBeDefined();
            expect(body.email).toBe(email);
            console.log("Email informado igual ao retornado? ", body.email == email)
            expect(body.password).toBe(senha);
            console.log("Senha informada igual a retornada? ", body.password == senha)
        });


        // API Test 4
        // Verifica signin com senha errada
        await test.step('API Signin senha errada', async () => {

            // Senha correta Aaaa1234@
            const senha_errada: string = "SenhaErrada1234@";
            const response = await request.post(
                'http://localhost:8080/auth/signin',
                {
                    data: {
                        "email": email,
                        "password": senha_errada
                    }
                }
            );

            // Code 401 significa não autorizado
            expect(response.status()).toBe(401);
            const body = await response.json();
            expect(body).toBeDefined();

            // Verifica mensagem padrão de email em uso
            expect(body.message).toBe("Credenciais inválidas");

            // Verifica se o status retornado no body é 401
            expect(body.status).toBe(401);
        });

    });
});