import { supabase } from "@/lib/supabase"

async function createEnquete(){
    
};

async function addVote(){

};
async function readOption(id: string) {
    const {data: db_opcao} = await supabase.from('opcoes').select('*').eq('id_enquete', id)
    return db_opcao
};

async function readVote(){ 
};