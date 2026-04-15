import fs from "fs";
import path from "path";

export default async function LerJSON(id: string){
    const CaminhoJSON = path.join(process.cwd(), 'enquetes', `${id}.json`);

    if(!fs.existsSync(CaminhoJSON)){
        return null;
    }

    const ConteudoString = fs.readFileSync(CaminhoJSON, 'utf-8');

    const dados = JSON.parse(ConteudoString);

    return dados;
}