'use client'
import Bar from "@/components/bar"
import { useEffect, useState } from "react";
import "@/components/style.css"
import { addVote, readVote } from "@/microservice/querys";
import { useForm } from "react-hook-form"

interface propsData {
  dados: any;
  enquete: any;
}

export default function Preencher({ dados, enquete }: propsData) {

  const [votoSelecionado, setVotoSelecionado] = useState<number | null>(null);
  const [idSelecionado, setSelecionado] = useState('')
  const texto = enquete[0].titulo;
  const [votosTotais, setTotais] = useState<Record<string, any[]>>({})
  const [jaVoto, setVotou] = useState(false)

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const idEnqueteAtual = enquete[0].id;
    const historicoVoto = localStorage.getItem(`voto_enquete_${idEnqueteAtual}`);
    if (historicoVoto) {
      setVotou(true);
    }
  }, [enquete]);

  useEffect(() => {
    async function buscarVoto() {
      let caixaTemporaria: any = {};

      for (const item of dados) {
        const listadeVotos = await readVote(item.id)
        caixaTemporaria[item.id] = listadeVotos;
      }

      setTotais(caixaTemporaria)
    }

    buscarVoto();
  }, [dados])

  async function onSubmit(data: any) {
    try {
      if (!idSelecionado) {
        alert("Por favor, selecione uma opção")
        return;
      }
      await addVote(idSelecionado, data.nome)
      reset();
      setSelecionado('')
      setVotoSelecionado(null)
      localStorage.setItem(`voto_enquete_${enquete[0].id}`, "true");
      setVotou(true);
      alert("votado com sucesso");
    } catch (error) {
      alert("Erro ao enviar a resposta, tente novamente. \n" + error)
    }
  }

  return (
    <main>
      <Bar />
      <h2 className="text-4xl font-bold my-8 uppercase text-center">{texto}</h2>

      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="m-4 box">
          <label htmlFor="NomeCompleto" className="uppercase block text-sm font-medium">
            Seu Nome:
          </label>
          <input
            type="text"
            id="NomeCompleto"
            className="w-full p-2 border border-gray-300 rounded mt-1 text-slate-900"
            placeholder="Digite seu nome completo"
            {...register("nome")}
          />
        </div>
        <fieldset>
          <div className="box">
            {dados.map((item: any, numero: number) => (
              <div key={`div${item.id}`} className="group">
                <label
                  htmlFor={item.id}
                  className={`flex items-center p-4 my-3 rounded-xl border-2 cursor-pointer justify-center transition-all duration-200 ${votoSelecionado === numero ? "border-cyan-600 bg-cyan-50 shadow-sm" : "border-slate-100 hover:border-slate-300 bg-white"}`}>
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name="enquete-opcao"
                      id={item.id}
                      checked={votoSelecionado === numero}
                      onChange={() => {
                        setVotoSelecionado(numero)
                        setSelecionado(item.id)
                      }}
                      className="appearance-none border-2 absolute left-0 border-slate-300 rounded-full checked:border-cyan-600 transition-all outline-none"
                    />
                    <div className={'absolute w-2.5 h-2.5 rounded-full bg-cyan-600 transition-transform duration-200 scale-0'}></div>
                  </div>

                  <p className={`font-medium w-full align-mi transition-colors text-center ${votoSelecionado === numero ? "text-cyan-800" : "text-slate-600"}`}>
                    {item.opcao}
                  </p>
                </label>
              </div>
            ))}
          </div>
        </fieldset>
        <div className="w-full flex justify-center my-4">
          {!jaVoto ? (
            <button
              type="submit"
              className="px-8 py-3 buttonSend bg-cyan-600 text-white font-bold hover:bg-cyan-700 transition-all rounded-lg cursor-pointer"
            >
              Enviar Resposta
            </button>
          ) : (
            <div className="px-8 py-3 w-[85dvw] text-center bg-slate-500 font-bold border-2 border-slate-900 rounded-lg text-white">
              Voto registrado nesta enquete
            </div>
          )}
        </div>

      </form>
      <div className="box">
        <div>
          {
            dados.map((item: any) => {
              const votosDesta = votosTotais[item.id] || []
              return (
                <div key={item.id}>
                  <h3 className="text-xl font-bold m-5">{item.opcao}: {votosDesta.length}</h3>
                  {votosDesta.map((voto: any) => (
                    <p key={voto.id} className="p-3 ml-3">• {voto.votante}</p>
                  ))}
                  <hr className="text-slate-300" />
                </div>
              )
            })
          }
        </div>
      </div>
    </main>
  );
}