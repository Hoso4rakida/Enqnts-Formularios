import { kv } from "@vercel/kv";

export default async function LerJSON(id: string) {
    try {
        // O KV busca a chave e já retorna o objeto parseado
        const dados = await kv.get(`enquete:${id}`);

        if (!dados) {
            return null;
        }

        return dados;
    } catch (error) {
        console.error("Erro ao ler do KV:", error);
        return null;
    }
}