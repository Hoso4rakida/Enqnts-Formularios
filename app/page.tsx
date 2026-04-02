"use client";

import { useState, FormEvent } from "react";
import Bar from "@/components/bar";

export default function Home() {
  const [getNumeroOpcoes, setNumeroOpcoes] = useState(2);
  const [linkGerado, setLinkGerado] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Evita que a página recarregue
    
    const formData = new FormData(e.currentTarget);
    const pergunta = formData.get("question") as string;
    
    // Coletamos as opções dinamicamente
    const opcoes: string[] = [];
    for (let i = 0; i < getNumeroOpcoes; i++) {
      const valor = formData.get(`options-${i}`) as string;
      if (valor) opcoes.push(valor);
    }

    // Geramos os parâmetros da URL de forma segura (codificada)
    const params = new URLSearchParams();
    params.set("nome", pergunta);
    params.set("opcoes", JSON.stringify(opcoes));
    params.set("lista", ""); // Iniciamos a lista vazia

    // Montamos a URL final baseada no domínio atual
    const urlFinal = `${window.location.origin}/formulario?${params.toString()}`;
    
    setLinkGerado(urlFinal);
    setCopiado(false); // Reseta o estado de cópia ao gerar um novo link
  }

  const copiarLink = () => {
    if (linkGerado) {
      navigator.clipboard.writeText(linkGerado);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000); // Feedback visual temporário
    }
  };

  return (
    <main>
      <Bar />

      <section className="p-4">
        <div className="box max-w-lg mx-auto bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="uppercase text-2xl font-bold text-slate-800">Criar uma enquete</h2>
          <hr className="text-slate-950/10 mt-5" />
          
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="question" className="uppercase text-sm font-bold text-slate-600">
                Pergunta:
              </label>
              <input
                type="text"
                id="question"
                name="question"
                required
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="Qual o tema da enquete?"
              />
            </div>

            <div className="mb-4">
              <label className="uppercase text-sm font-bold text-slate-600">
                Opções:
              </label>
              {Array.from({ length: getNumeroOpcoes }, (_, i) => (
                <input
                  key={i}
                  type="text"
                  name={`options-${i}`}
                  required
                  className="w-full p-2 my-2 border border-gray-300 rounded focus:border-cyan-500 outline-none"
                  placeholder={`Opção ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center mb-6">
              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-transform active:scale-90 shadow-md"
                onClick={() => setNumeroOpcoes(getNumeroOpcoes + 1)}
              >
                +
              </button>
              <p className="ml-3 text-slate-600 font-medium">Adicionar opção</p>
            </div>

            <button
              type="submit"
              className="px-4 py-3 w-full bg-cyan-600 text-white rounded-lg font-bold hover:bg-cyan-700 active:scale-[0.98] transition-all shadow-lg"
            >
              Gerar link da enquete
            </button>
          </form>

          {/* ÁREA DO LINK GERADO */}
          {linkGerado && (
            <div className="mt-8 p-4 bg-slate-50 border-2 border-dashed border-cyan-200 rounded-lg animate-in fade-in slide-in-from-top-2">
              <p className="text-xs font-bold text-slate-500 uppercase mb-2">Seu link está pronto:</p>
              
              <div className="flex gap-2">
                <input 
                  readOnly 
                  value={linkGerado}
                  className="flex-1 p-2 text-xs font-mono bg-white border border-slate-200 rounded text-cyan-700 outline-none"
                />
                <button 
                  onClick={copiarLink}
                  className={`px-4 py-2 rounded font-bold text-xs transition-colors ${
                    copiado ? "bg-green-500 text-white" : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                >
                  {copiado ? "Copiado!" : "Copiar"}
                </button>
              </div>
              
              <a 
                href={linkGerado} 
                target="_blank"
                className="block mt-4 text-center text-sm text-cyan-600 underline font-medium hover:text-cyan-800"
              >
                Testar link gerado →
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}