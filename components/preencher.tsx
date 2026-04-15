'use client'
import Bar from "@/components/bar"
import { useState } from "react";
import "@/components/style.css"

interface propsData {
  dados: any;
}

export default function Preencher({ dados }: propsData) {
  const [votoSelecionado, setVotoSelecionado] = useState<number | null>(null);

  return (
    <main>
      <Bar />
      <section className="box max-w-lg">
        <h2 className="text-xl font-bold mb-4 uppercase">{dados.Pergunta}</h2>

        <form className="mt-4">
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
          <fieldset>
            <legend>Opções</legend>
            <div>
              {dados.opcoes.map((item: any, index: number) => (
                <div key={index} className="group">
                  <label
                    htmlFor={`${index}-opcao`}
                    className={`flex items-center p-4 my-3 rounded-xl border-2 cursor-pointer justify-center transition-all duration-200 ${votoSelecionado === index ? "border-cyan-600 bg-cyan-50 shadow-sm" : "border-slate-100 hover:border-slate-300 bg-white"}`}>
                    <div className="relative flex items-center justify-center">
                      <input
                        type="radio"
                        name="enquete-opcao"
                        id={`${index}-opcao`}
                        checked={votoSelecionado === index}
                        onChange={() => setVotoSelecionado(index)}
                        className="appearance-none border-2 absolute left-0 border-slate-300 rounded-full checked:border-cyan-600 transition-all outline-none"
                      />
                      <div className={'absolute w-2.5 h-2.5 rounded-full bg-cyan-600 transition-transform duration-200 scale-0'}></div>
                    </div>

                    <p className={`font-medium w-full align-mi transition-colors text-center ${votoSelecionado === index ? "text-cyan-800" : "text-slate-600"}`}>
                      {item.texto}
                    </p>
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          <button
            type="submit"
            className="px-4 py-2 mt-6 w-full bg-cyan-600 text-white rounded font-bold hover:bg-cyan-700 transition-all"
          >
            Enviar Resposta
          </button>
        </form>


        <div className="mt-8 p-4 bg-stone-100 dark:bg-stone-800 rounded-xl border border-stone-300 dark:border-stone-700">
          <p className="text-xs font-mono uppercase text-stone-500 mb-2">Resultados Atuais:</p>
          <pre className="text-xs font-mono overflow-auto text-white">
            {JSON.stringify(dados, null, 2)}
          </pre>
        </div>
      </section>
    </main>
  );
}