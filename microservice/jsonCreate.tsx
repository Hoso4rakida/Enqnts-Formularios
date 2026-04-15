"use server";

import fs from "fs";
import path from "path";
import crypto from "crypto";

export async function salvarEnquete(data: any){
    // gerar
    const NomeDoJson = crypto.randomBytes(4).toString("hex").toUpperCase();

    const CaminhoPasta = path.join(process.cwd(), "enquetes");
    
    //?pasta Existe
    if(!fs.existsSync(CaminhoPasta)){
        fs.mkdirSync(CaminhoPasta)
    }

    const CaminhoArquivo = path.join(CaminhoPasta, `${NomeDoJson}.json`);

    try{
        const ConteudoJSON = JSON.stringify(data, null, 2);
        fs.writeFileSync(CaminhoArquivo, ConteudoJSON)

        return{success: true, arquivo: NomeDoJson}
    } catch(error){
        console.log("Erro ao criar o arquivo: ", error)
        return{success: false};
    }
}