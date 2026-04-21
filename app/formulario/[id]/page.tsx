import Preencher from "@/components/preencher";
import { readOption,readEnquete } from "@/microservice/querys";

export default async function Formulario({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const conteudo = await readOption(id);
  const enquete = await readEnquete(id);

  if (!conteudo) {
    return <div className="p-10 text-center">Enquete não encontrada!</div>;
  }

  return (
    <Preencher dados={conteudo} enquete={enquete}/>
  );
}