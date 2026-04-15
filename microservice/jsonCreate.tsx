"use server";

import { put } from "@vercel/blob";
import crypto from "crypto";

export async function salvarEnquete(data: any) {
    const NomeDoArquivo = crypto.randomBytes(4).toString("hex").toUpperCase();

    try {
        const blob = await put(`enquetes/${NomeDoArquivo}.json`, JSON.stringify(data), {
            access: 'public',
            addRandomSuffix: false,
            contentType: 'application/json',
        });

        return { 
            success: true, 
            arquivo: NomeDoArquivo,
            url: blob.url
        };
    } catch (error) {
        console.error("Erro ao salvar no Vercel Blob: ", error);
        return { success: false };
    }
}