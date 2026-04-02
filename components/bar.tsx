import { FaRegCheckCircle } from "react-icons/fa";

function Bar() {
  return (
    <header className="flex justify-between p-5 bg-cyan-600 items-center">
        {/* Lado Esquerdo: Textos */}
        <div>
          <h1 className="text-4xl font-bold uppercase">Enqntes</h1>
          <h2 className="uppercase text-sm opacity-80">Formularios Rapidos</h2>
        </div>

        {/* Lado Direito: Ícone (fora da div de cima) */}
        <div className="bg-white p-2 rounded-xl">
          <FaRegCheckCircle size={42} className="text-cyan-600" />
        </div>
        </header>
  );
}

export default Bar;