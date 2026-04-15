import Preencher from "@/components/preencher";
import LerJSON from "@/microservice/jsonRead";

export default async function Formulario({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const conteudo = await LerJSON(id);

  if (!conteudo) {
    return <div className="p-10 text-center">Enquete não encontrada!</div>;
  }

  return (
    <Preencher dados={conteudo} />
  );
}