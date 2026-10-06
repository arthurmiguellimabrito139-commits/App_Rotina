import { useState } from "react";

export function useAuth() {
  const [usuario, setUsuario] = useState(() => {
    const salvo = localStorage.getItem("usuario");
    return salvo ? JSON.parse(salvo) : null;
  });

  const [token, setToken] = useState(() => {
    const salvo = localStorage.getItem("token");
    return salvo ? salvo : null;
  });

  async function login(email, senha) {
    const resposta = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.message || "Falha ao fazer login");
    }

    const dados = await resposta.json();
    setToken(dados.token);
    setUsuario(dados.usuario);

    localStorage.setItem("token", dados.token);
    localStorage.setItem("usuario", JSON.stringify(dados.usuario));
  }

  async function registrar(nome, email, senha) {
    const resposta = await fetch("http://localhost:3001/api/auth/registrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      throw new Error(erro.message || "Falha ao registrar");
    }
  }

  function logout() {
    setUsuario(null);
    setToken(null);

    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  }

  return { usuario, token, login, logout, registrar };
}