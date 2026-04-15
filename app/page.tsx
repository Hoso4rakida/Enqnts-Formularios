"use client";

import { useState } from "react";
import Bar from "@/components/bar";
import { useForm, SubmitHandler } from "react-hook-form"
import { salvarEnquete } from "@/microservice/jsonCreate";
import { MdOutlineContentCopy } from "react-icons/md";

export default function Home() {
  const [opcoes, setOpcoes] = useState(["Opção 1", "Opção 2"])
  const [enquete, setEnquete] = useState(false)
  const [pagina, setPagina] = useState("")

  const { register, handleSubmit } = useForm()

  interface moldeOpcao{
    texto: string,
    votos: string[]
  }

async function onSubmit(data: any) {
    const PerguntaPrincipal = data.Pergunta;

    const opcoesFormatadas: moldeOpcao[] = Object.keys(data)
      .filter((chave) => chave !== "Pergunta")
      .map((chave) => ({
        texto: data[chave],
        votos: []
      }));

    const objetoFinal = {
      Pergunta : PerguntaPrincipal,
      opcoes: opcoesFormatadas
    }

    try {
      // Use await para garantir que o código espere o Blob responder
      const res = await salvarEnquete(objetoFinal);
      
      if (res && res.success) {
        setPagina(`${window.location.origin}/formulario/${res.arquivo}`);
        setEnquete(true);
      } else {
        alert("A Vercel recusou o salvamento. Verifique o terminal do VS Code.");
      }
    } catch (error) {
      console.error("Erro crítico na chamada:", error);
    }
  }

  return (
    <main>
      <Bar />

      <section className="p-4">
        <div className="box max-w-lg mx-auto bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="uppercase text-2xl font-bold text-slate-800">
            Criar uma enquete
          </h2>
          <hr className="text-slate-950/10 mt-5" />

          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="question"
                className="uppercase text-sm font-bold text-slate-600"
              >
                Pergunta:
              </label>
              <input
                type="text"
                id="question"
                required
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring-2 focus:ring-cyan-500 outline-none"
                placeholder="Qual o tema da enquete?"
                {...register("Pergunta")}
              />
            </div>

            <div className="mb-4">
              <label className="uppercase text-sm font-bold text-slate-600">
                Opções:
              </label>
              {
                opcoes.map((indice) => {
                  return (
                    <input
                      key={indice}
                      type="text"
                      id={`question ${indice}`}
                      required
                      className="w-full p-2 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-cyan-500 outline-none"
                      placeholder={indice}
                      {...register(indice)}
                    />
                  )
                }
                )
              }
            </div>

            <div className="flex items-center mb-6">
              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center bg-cyan-600 text-white rounded-full hover:bg-cyan-700 transition-transform active:scale-90 shadow-md"
                onClick={() => {
                  const opcao: string = `Opção ${opcoes.length + 1}`
                  setOpcoes([...opcoes, opcao])
                }}
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
          {enquete && ( // Usar && é mais limpo que ternário com ""
            <>
              <hr className="my-5 opacity-20" />
              <div className="border-2 p-3 rounded-xl border-stone-300 flex justify-between items-center">
                <a
                  href={pagina}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-600 underline cursor-pointer truncate mr-2"
                >
                  {pagina}
                </a>
                <MdOutlineContentCopy
                  className="cursor-pointer text-slate-500 hover:text-cyan-600 transition-colors"
                  size={24}
                  onClick={() => {
                    navigator.clipboard.writeText(pagina);
                    alert("Link copiado!");
                  }}
                />
              </div>
            </>
          )}
        </div>



      </section>
    </main>
  );
}
