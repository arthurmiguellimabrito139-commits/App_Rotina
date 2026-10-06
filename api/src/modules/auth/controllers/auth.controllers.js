import {criarHash , compararSenha} from "../services/senha.services.js";
import { Usuario } from "../models/usuario.model.js";
import jwt from "jsonwebtoken";

export async function registrarUsuario(req, res) {
    try {
        const { nome, email, senha } = req.body;
        const senhaHash = await criarHash(senha);
        const usuarioCriado = await Usuario.create({nome, email, senha: senhaHash});
        res.status(201).json({ message: "Usuário registrado com sucesso", usuario : { id: usuarioCriado.id, nome: usuarioCriado.nome, email: usuarioCriado.email } });
    } catch (error) {
        res.status(400).json({ message: "Erro ao registrar usuário", error: error.message });
    } 

}

export async function loginUsuario(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const senhaCorreta = await compararSenha(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "Login bem-sucedido",
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao fazer login", error: error.message });
  }
}