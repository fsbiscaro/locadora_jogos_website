 const URI = '/login';
        const txtEmail = document.getElementById("txtEmail");
        const txtSenha = document.getElementById("txtSenha");
        const btnLogin = document.getElementById("btnLogin");
        const divResposta = document.getElementById("divResposta");

        btnLogin.onclick = onclick_btnLogin;

        function onclick_btnLogin() {
            const email = txtEmail.value.trim();
            const senha = txtSenha.value.trim();

            if (!email || !senha) {
                divResposta.textContent = "Preencha todos os campos.";
                return;
            }

            const obj = {
                email_usuario: email,
                senha_usuario: senha
            };

            fetch_post_verificarLogin(obj);
        }

        function fetch_post_verificarLogin(obj) {
            const textoJson = JSON.stringify(obj);

            fetch(URI, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': '' // Você pode incluir `Bearer ${token}` aqui, se já tiver
                },
                body: textoJson
            })
            .then(response => {
                if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
                return response.text();
            })
            .then(jsonTextoResposta => {
                console.log(jsonTextoResposta);
                const obj = JSON.parse(jsonTextoResposta);

                if (obj.status === true) {
                    localStorage.setItem("token", obj.token);
                    localStorage.setItem("payload", JSON.stringify(obj.dados));
                    divResposta.textContent = "Login realizado com sucesso!";
                    // Redirecionar se quiser:
                    window.location = "Painel.html";
                } else {
                    divResposta.textContent = "Login inválido.";
                }
            })
            .catch(erro => {
                console.error("Erro na requisição:", erro);
                divResposta.textContent = "Erro ao tentar logar.";
            });
        }