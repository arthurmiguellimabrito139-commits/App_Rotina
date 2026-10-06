import bcrypt from "bcrypt";

export async function criarHash(senha) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(senha, saltRounds);
    return hash;
} 

export async function compararSenha(senha, hash) {
  return await bcrypt.compare(senha, hash);
} 