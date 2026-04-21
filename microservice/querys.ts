'use server'
import { supabase } from "@/lib/supabase"
import crypto from 'crypto';

export async function createEnquete(titulo: any, lista: any){
    const idEnquete = crypto.randomBytes(4).toString('hex')
    
    const {error: erroEnquete} = await supabase.from('enquetes').insert([
        {id: idEnquete, titulo: titulo} 
    ])

    if (erroEnquete) throw erroEnquete;

    //opcoes da enquete
    const opcoesParaInserir = lista.map((tituloOpcao: any) =>({
        id: crypto.randomBytes(5).toString('hex'),
        opcao: tituloOpcao,
        id_enquete: idEnquete
    }))

    const {error: erroLista} = await supabase.from('opcoes').insert(opcoesParaInserir)
    if (erroLista) throw erroLista;

    return idEnquete;
};



export async function readOption(id: string) {
    const {data: db_opcao, error} = await supabase.from('opcoes').select('*').eq('id_enquete', id);
    if (error) throw error;
    return db_opcao;
};

export async function readEnquete(id: string){
    const {data: db_enquete, error} = await supabase.from('enquetes').select('*').eq('id', id);
    if(error) throw error;
    return db_enquete
}

export async function addVote(idOpcao: string, nomeVotante: string){
    const idVoto = crypto.randomBytes(6).toString('hex')

    const {error: erroVoto} = await supabase.from('votos').insert([
        {id: idVoto, id_opcoes: idOpcao, votante: nomeVotante}
    ])

};

export async function readVote(idOpcao: string){
    const {data: db_voto, error} = await supabase.from('votos').select('*').eq('id_opcoes', idOpcao)
    if(error) throw error;
    return db_voto;
};

