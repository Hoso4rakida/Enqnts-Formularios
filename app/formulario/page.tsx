'use client'

import Bar from "@/components/bar";

interface FormularioProps {
  nome: string;
  opcoes?: string[];
  lista: string; 
}

function Formulario({ //valores default para evitar erros caso não sejam passados
  nome, 
  opcoes = ["Opção 1", "Opção 2"],
  lista 
}: FormularioProps) {
  
  // Tratando o JSON
  const dadosLista = lista ? JSON.parse(lista) : null;

  return (
    <main>
      <Bar />
      <section className="box p-4">
        <h2 className="text-xl font-bold mb-4 uppercase">Enquete: {nome}</h2>
        
        <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label htmlFor="NomeCompleto" className="uppercase block text-sm font-medium">
              Seu Nome:
            </label>
            <input
              type="text"
              id="NomeCompleto"
              className="w-full p-2 border border-gray-300 rounded mt-1 text-slate-900"
              placeholder="Digite seu nome completo" 
            />
          </div>

          <div className="space-y-2">
            <label className="uppercase block text-sm font-medium">Opções</label>
            {opcoes.map((opcao, index) => (
              <div key={index} className="flex items-center p-2 hover:bg-slate-100 rounded transition-colors">
                <input 
                  type="checkbox" 
                  id={`opcao-${index}`} 
                  name={`opcao-${index}`} 
                  className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500" 
                />
                <label htmlFor={`opcao-${index}`} className="ml-2 text-slate-700 cursor-pointer w-full">
                  {opcao}
                </label>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="px-4 py-2 mt-6 w-full bg-cyan-600 text-white rounded font-bold hover:bg-cyan-700 transition-all"
          >
            Enviar Resposta
          </button>
        </form>


        <div className="mt-8 p-4 bg-stone-100 dark:bg-stone-800 rounded-xl border border-stone-300 dark:border-stone-700">
          <p className="text-xs font-mono uppercase text-stone-500 mb-2">Resultados Atuais:</p>
          <pre className="text-xs font-mono overflow-auto">
            {dadosLista 
              ? JSON.stringify(dadosLista, null, 2)
              : "Ninguém respondeu a enquete ainda"
            }
          </pre>
        </div>
      </section>
    </main>
  );
}

export default Formulario;