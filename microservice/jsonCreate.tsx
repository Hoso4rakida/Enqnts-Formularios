"use server";

import { kv } from "@vercel/kv";
import crypto from "crypto";

export async function salvarEnquete(data: any){
    // Gerar o ID único (igual você fazia antes)
    const NomeDaChave = crypto.randomBytes(4).toString("hex").toUpperCase();

    try {
        // Em vez de fs.writeFileSync, usamos kv.set
        // A chave será 'enquete:ID' e o valor será o seu objetoFinal
        await kv.set(`enquete:${NomeDaChave}`, data);

        return { success: true, arquivo: NomeDaChave };
    } catch (error) {
        console.error("Erro ao salvar no KV: ", error);
        return { success: false };
    }
}